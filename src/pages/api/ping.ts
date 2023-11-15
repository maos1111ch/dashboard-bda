import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await sql`select * from objetivos;`;
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
