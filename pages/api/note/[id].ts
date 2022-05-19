import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, title, content } = req.body;
  const noteId = req.query.id;
  if (req.method === "PUT") {
    const note = await prisma.note.update({
      where: { id: String(noteId) },
      data: { type, title, content },
    });
    return res.status(200).json(note);
  } else if (req.method === "DELETE") {
    const note = await prisma.note.delete({ where: { id: String(noteId) } });
    return res.status(200).json(note);
  } else {
    console.log("Theres no Note with this ID");
  }
}

export default handler;
