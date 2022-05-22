import { useRouter } from "next/router";
import { ArrowLeft } from "phosphor-react";
import { useState } from "react";
import { NoteType, noteTypes } from "..";
import { CloseButton } from "../../Note/CloseButton";
import { Loading } from "../../Loading";
import Image from "next/image";

interface NoteContentStepProps {
  noteType: NoteType;
  onNoteRestartRequested: () => void;
  onNoteSent: () => void;
}

interface FormData {
  type: string;
  title: string;
  content: string;
  id: string;
}

export function NoteContentStep({
  noteType,
  onNoteRestartRequested,
  onNoteSent,
}: NoteContentStepProps) {
  const [isSendingNote, setIsSendingNote] = useState(false);
  const noteTypeInfo = noteTypes[noteType];

  const [form, setForm] = useState<FormData>({
    type: noteTypeInfo.title,
    title: "",
    content: "",
    id: "",
  });
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function createNote(data: FormData) {
    try {
      setIsSendingNote(true);
      fetch("/api/create", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }).then(() => {
        onNoteSent();
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute top-5 left-5 text-black hover:text-brand-dark transition-colors"
          onClick={onNoteRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2 text-black">
          <Image
            src={noteTypeInfo.image.src}
            alt={noteTypeInfo.image.alt}
            width={30}
            height={30}
          />
          {noteTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNote(form);
        }}
        className="my-4 w-full"
      >
        <input
          type="text"
          placeholder="Título"
          className="w-full text-sm mb-2 p-2 placeholder-slate-500 text-black border border-brand-500 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring focus:outline-none"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          value={form.title}
        />
        <textarea
          className="min-w-[304px] w-full min-h-[112px] p-2 text-sm placeholder-slate-500 text-black border border-brand-500 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring resize-none focus:outline-none scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Coloque o conteúdo do seu lembrete se precisar..."
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <footer className="flex gap-2 mt-2">
          <button
            type="submit"
            className="p-2 bg-brand-500 text-white rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={form.title.length === 0 || isSendingNote}
          >
            {isSendingNote ? <Loading /> : "Criar lembrete"}
          </button>
        </footer>
      </form>
    </>
  );
}
