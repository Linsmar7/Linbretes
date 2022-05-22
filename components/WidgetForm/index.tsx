import React, { useState } from "react";
import { NoteTypeStep } from "./Steps/NoteTypeStep";
import { NoteContentStep } from "./Steps/NoteContentStep";
import { NoteSuccessStep } from "./Steps/NoteSuccessStep";
import noteImageUrl from "../../public/noteTypesSVG/note.svg";
import listImageUrl from "../../public/noteTypesSVG/list-checks.svg";

export const noteTypes = {
  SIMPLE: {
    title: "Simples",
    image: {
      src: noteImageUrl.src,
      alt: "Imagem de um lembrete",
    },
  },
  LIST: {
    title: "Lista",
    image: {
      src: listImageUrl.src,
      alt: "Imagem de uma lista de afazeres",
    },
  },
};

export type NoteType = keyof typeof noteTypes;

export function WidgetForm() {
  const [noteType, setNoteType] = useState<NoteType | null>(null);
  const [noteSent, setNoteSent] = useState(false);

  function handleRestartNote() {
    setNoteSent(false);
    setNoteType(null);
  }

  return (
    <div className="flex flex-col items-center bg-slate-900 p-4 relative rounded-2xl shadow-lg w-[calc(100vw-2rem)] md:w-auto mb-4">
      {noteSent ? (
        <NoteSuccessStep onNoteRestartRequested={handleRestartNote} />
      ) : !noteType ? (
        <NoteTypeStep onNoteTypeChanged={setNoteType} />
      ) : (
        <NoteContentStep
          noteType={noteType}
          onNoteRestartRequested={handleRestartNote}
          onNoteSent={() => setNoteSent(true)}
        />
      )}
      <footer className="text-xs text-neutral-400">
        Feito com ♥ por{" "}
        <a
          href="https://www.linsmarvital.com/"
          className="underline underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          Linsmar
        </a>
      </footer>
    </div>
  );
}
