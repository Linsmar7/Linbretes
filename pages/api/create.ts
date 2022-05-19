import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, title, content } = req.body;
  try {
    await prisma.note.create({ data: { type, title, content } });
    return res.status(200).json({
      message: "Note Created",
    });
  } catch (error) {
    console.log("An error occurred");
  }
}

export default handler;
