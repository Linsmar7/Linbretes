import React, { useState } from "react";
import { useRouter } from "next/router";

interface FormData {
  type: string;
  title: string;
  content: string;
  id: string;
}

export function Form() {
  const [form, setForm] = useState<FormData>({
    type: "",
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
      fetch("/api/create", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }).then(() => {
        setForm({ type: "", title: "", content: "", id: "" });
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      createNote(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="flex flex-col w-2/4 gap-y-2 justify-center"
      >
        <select
          name="type"
          className="border-2 border-blue-700 p-1"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          value={form.type}
        >
          <option value="simple">Simples</option>
          <option value="link">Link</option>
        </select>
        <input
          type="text"
          placeholder="Título"
          className="border-2 border-blue-700 p-1"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          value={form.title}
        />
        <textarea
          name="content"
          cols={10}
          rows={5}
          className="border-2 border-blue-700 p-1"
          placeholder="Conteúdo"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          value={form.content}
        ></textarea>
        <button
          type="submit"
          className="border bg-blue-700 rounded-md p-2 text-lg text-white self-center"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
