import { useRouter } from "next/router";
import { useState } from "react";
import { NoteProps } from "./Note";

interface ModalProps {
  show: boolean;
  close: () => void;
  noteDataUpdate: NoteProps;
}

export function Modal({ show, close, noteDataUpdate }: ModalProps) {
  const [noteData, setNoteData] = useState<NoteProps>({
    title: "",
    content: "",
    id: noteDataUpdate.id,
    type: noteDataUpdate.type,
  });
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  async function updateNote(
    id: string,
    data: { title: string; content: string; type: string }
  ) {
    try {
      await fetch(`/api/note/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data),
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (!show) return null;

  return (
    <div className="flex flex-col">
      <h4>Atualizar Nota</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateNote(noteDataUpdate.id, noteData);
          close();
        }}
        className="flex flex-col"
      >
        <input
          type="text"
          placeholder={noteDataUpdate.title}
          className="border-2 border-blue-700 p-1"
          value={noteData.title}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
        />
        <textarea
          name="content"
          cols={10}
          rows={5}
          className="border-2 border-blue-700 p-1"
          placeholder={noteDataUpdate.content}
          value={noteData.content}
          onChange={(e) =>
            setNoteData({ ...noteData, content: e.target.value })
          }
        ></textarea>
        <button
          type="submit"
          className="border bg-blue-700 rounded-md p-2 text-lg text-white self-center"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
