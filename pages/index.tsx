import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { Form } from "../components/Form";
import { Note, NoteProps } from "../components/Note";
import { prisma } from "../lib/prisma";

interface HomeProps {
  notes: Array<NoteProps>;
}

const Home = ({ notes }: HomeProps) => {
  return (
    <div>
      <Head>
        <title>Linbretes</title>
        <meta name="description" content="Feito para não esquecer!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form />
      <Note notes={notes} />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: { id: true, type: true, title: true, content: true },
  });
  return {
    props: {
      notes,
    },
  };
};
