import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";

const getObjetivos = async () => {
  return await sql`select * from objetivos;`;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      const result = await getObjetivos();
      response
        .status(200)
        .json({ success: true, message: "OK", data: result.rows });
      break;
    default:
      response
        .status(400)
        .json({ success: false, message: "method invalid.", data: null });
      break;
  }
};
