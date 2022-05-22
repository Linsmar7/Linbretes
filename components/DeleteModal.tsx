import React from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";

interface DeleteModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  noteId: string;
}

export function DeleteModal({ isOpen, setIsOpen, noteId }: DeleteModalProps) {
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

  function handleDelete() {
    deleteNote(noteId);
    setIsOpen(false);
  }
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-slate-900 p-4 rounded-2xl shadow-lg mb-4 text-white flex flex-col justify-center gap-y-2">
          <Dialog.Title className="text-xl font-bold">
            Deletar Lembrete
          </Dialog.Title>
          <Dialog.Description className="mb-2">
            Isso irá{" "}
            <span className="text-red-400">deletar permanentemente</span> esse
            lembrete!
          </Dialog.Description>

          <p className="text-center">
            Tem certeza que quer deletar o lembrete?
          </p>

          <div className="flex justify-center gap-x-2 mt-10">
            <button
              onClick={handleDelete}
              className="py-2 px-6 bg-red-500 rounded-md border-transparent text-sm text-white leading-6 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-500"
            >
              Sim, quero deletar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="py-2 px-6 bg-brand-500 rounded-md border-transparent text-sm text-white leading-6 hover:bg-brand-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-500"
            >
              Não, cancelar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
