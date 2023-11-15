import { generarClientes } from "@/helpers/mock_data/cliente";
import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";

const getClients = async () => {
  return await sql`select * from clientes;`;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      const result = await getClients()
      response
        .status(200)
        .json({ success: true, message: "OK", data: result.rows });
      break;
    default:
      response
        .status(405)
        .json({ success: false, message: "method invalid.", data: null });
      break;
  }
};
