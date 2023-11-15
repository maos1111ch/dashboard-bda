import { generarProductos } from "@/helpers/mock_data/productos";
import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";

const getProductos = async () => {
  return await sql`select * from productos;`;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      const result = await getProductos();
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
