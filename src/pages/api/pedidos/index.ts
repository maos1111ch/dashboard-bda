import { generarPedidos } from "@/helpers/mock_data/pedidos";
import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";

const getPedidos = async () => {
  return await sql`select * from pedidos;`;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      const result = await getPedidos();
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
