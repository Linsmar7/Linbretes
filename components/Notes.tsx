import { useState } from "react";
import { UpdateModal } from "./UpdateModal";
import { Trash, Pencil } from "phosphor-react";
import { DeleteModal } from "./DeleteModal";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  type: string;
}

interface NoteComponentProps {
  notes: Array<NoteProps>;
}

export function Notes({ notes }: NoteComponentProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [noteData, setNoteData] = useState<NoteProps>({
    title: "",
    id: "",
    content: "",
    type: "",
  });
  const [noteId, setNoteId] = useState("");

  function handleEditNote({ title, content, id, type }: NoteProps) {
    setNoteData({ title, content, id, type });
    setOpenUpdateModal(true);
  }
  function handleDeleteNote(id: string) {
    setNoteId(id);
    setOpenDeleteModal(true);
  }
  if (!notes) return <p>Carregando...</p>;
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {notes.map((e) => (
        <div
          key={e.id}
          className="relative w-60 h-40 bg-brand-dark rounded-lg text-white"
        >
          <div className="flex flex-col p-4">
            <h3 className="text-xl font-bold">{e.title}</h3>
            <p>{e.content}</p>
            <div className="absolute bottom-2 right-3">
              <button
                onClick={() =>
                  handleEditNote({
                    title: e.title,
                    content: e.content,
                    id: e.id,
                    type: e.type,
                  })
                }
                className=""
              >
                <Pencil />
              </button>
              <button
                onClick={() => handleDeleteNote(e.id)}
                className="ml-2 text-red-400"
              >
                <Trash />
              </button>
            </div>
          </div>
        </div>
      ))}
      <UpdateModal
        isOpen={openUpdateModal}
        setIsOpen={setOpenUpdateModal}
        noteDataUpdate={noteData}
      />
      <DeleteModal
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        noteId={noteId}
      />
    </div>
  );
}
