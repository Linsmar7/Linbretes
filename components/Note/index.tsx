import { Pencil, Trash } from "phosphor-react";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  type: string;
}

interface NoteComponentProps {
  noteData: NoteProps;
  handleEditNote: (data: NoteProps) => void;
  handleDeleteNote: (id: string) => void;
}

export function Note({
  noteData,
  handleEditNote,
  handleDeleteNote,
}: NoteComponentProps) {
  return (
    <div className="relative w-60 h-40 bg-brand-light rounded-lg text-white">
      <div className="flex flex-col p-4">
        <h3 className="text-xl font-bold">{noteData.title}</h3>
        <p>{noteData.content}</p>
        <div className="absolute bottom-2 right-3">
          <button
            onClick={() =>
              handleEditNote({
                title: noteData.title,
                content: noteData.content,
                id: noteData.id,
                type: noteData.type,
              })
            }
            className=""
          >
            <Pencil />
          </button>
          <button
            onClick={() => handleDeleteNote(noteData.id)}
            className="ml-2 text-red-400"
          >
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}
