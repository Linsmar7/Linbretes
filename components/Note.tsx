import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "./Modal";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  type: string;
}

interface NoteComponentProps {
  notes: Array<NoteProps>;
}

export function Note({ notes }: NoteComponentProps) {
  const [showModal, setShowModal] = useState(false);
  const [noteData, setNoteData] = useState<NoteProps>({
    title: "",
    id: "",
    content: "",
    type: "",
  });
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function deleteNote(id: string) {
    try {
      fetch(`/api/note/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditNote({ title, content, id, type }: NoteProps) {
    setNoteData({ title, content, id, type });
    setShowModal(true);
  }
  if (!notes) return <p>Carregando...</p>;
  return (
    <div>
      {notes.map((e) => (
        <div key={e.id} className="flex flex-col w-40">
          <h3>{e.title}</h3>
          <p>{e.content}</p>
          <button
            onClick={() => deleteNote(e.id)}
            className="bg-red-600 self-left"
          >
            REMOVE
          </button>
          <button
            onClick={() =>
              handleEditNote({
                title: e.title,
                content: e.content,
                id: e.id,
                type: e.type,
              })
            }
            className="bg-yellow-600 self-left"
          >
            EDIT
          </button>
        </div>
      ))}
      <Modal show={showModal} noteDataUpdate={noteData} />
    </div>
  );
}
