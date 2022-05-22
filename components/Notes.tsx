import { useState } from "react";
import { UpdateModal } from "./Note/UpdateModal";
import { DeleteModal } from "./Note/DeleteModal";
import { Note, NoteProps } from "./Note";
import { Loading } from "./Loading";

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
  if (!notes) return <Loading />;
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {notes.map((e) => (
        <Note
          key={e.id}
          noteData={e}
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
        />
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
