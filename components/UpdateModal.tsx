import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NoteProps } from "./Notes";

interface UpdateModalProps {
  isOpen: boolean;
  noteDataUpdate: NoteProps;
  setIsOpen: (open: boolean) => void;
}

export function UpdateModal({
  isOpen,
  noteDataUpdate,
  setIsOpen,
}: UpdateModalProps) {
  const [noteData, setNoteData] = useState<NoteProps>({
    title: noteDataUpdate.title,
    content: noteDataUpdate.content,
    id: noteDataUpdate.id,
    type: noteDataUpdate.type,
  });
  useEffect(() => {
    setNoteData(noteDataUpdate);
  }, [noteDataUpdate]);
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

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-slate-900 p-4 rounded-2xl shadow-lg mb-4 text-white flex flex-col justify-center">
          <Dialog.Title className="text-xl font-bold">
            Atualizar Nota
          </Dialog.Title>
          <Dialog.Description className="mb-2">
            Atualize seu lembrete!
          </Dialog.Description>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateNote(noteDataUpdate.id, noteData);
              setIsOpen(false);
            }}
            className="flex flex-col gap-y-2 text-black"
          >
            <input
              type="text"
              placeholder={noteDataUpdate.title}
              className="w-full text-sm mb-2 p-2 placeholder-slate-400 text-slate-100 border border-slate-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring focus:outline-none"
              value={noteData.title}
              onChange={(e) =>
                setNoteData({ ...noteData, title: e.target.value })
              }
            />
            <textarea
              name="content"
              cols={10}
              rows={5}
              className="min-w-[304px] w-full min-h-[112px] p-2 text-sm placeholder-slate-400 text-slate-100 border border-slate-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring resize-none focus:outline-none scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thin"
              placeholder={noteDataUpdate.content}
              value={noteData.content}
              onChange={(e) =>
                setNoteData({ ...noteData, content: e.target.value })
              }
            ></textarea>
            <div className="flex justify-between">
              <button
                type="submit"
                className="py-2 px-6 bg-brand-500 rounded-md border-transparent text-sm text-white leading-6 hover:bg-brand-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-500"
              >
                Atualizar
              </button>
              <button
                className="py-2 px-6 bg-red-500 rounded-md border-transparent text-sm text-white leading-6 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-500"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
