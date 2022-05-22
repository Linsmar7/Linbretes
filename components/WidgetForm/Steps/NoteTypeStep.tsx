import { NoteType, noteTypes } from "..";
import { CloseButton } from "../../CloseButton";
import Image from "next/image";

interface NoteTypeStepProps {
  onNoteTypeChanged: (type: NoteType) => void;
}

export function NoteTypeStep({ onNoteTypeChanged }: NoteTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6 text-neutral-400">
          Tipo do Lembrete
        </span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(noteTypes).map(([key, value]) => {
          return (
            <button
              className="bg-slate-800 rounded-lg py-5 w-32 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
              type="button"
              key={key}
              onClick={() => onNoteTypeChanged(key as NoteType)}
            >
              <Image
                src={value.image.src}
                alt={value.image.alt}
                width={30}
                height={30}
              />
              <span className="text-white">{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
