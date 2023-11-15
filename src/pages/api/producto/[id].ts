import { NextApiRequest, NextApiResponse } from "next";
import { getPedidosByProducto, getProductoById } from "@/utils/queryDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    method,
    query: { id },
  } = request;

  if (!id || Array.isArray(id)) {
    response.status(400).json({ success: false, message: "invalid id" });
    return;
  }

  switch (method) {
    case "GET":
      const [dataProducto] = (await getProductoById(parseInt(id))).rows;
      const detalles = (await getPedidosByProducto(dataProducto.id_producto))
        .rows;

      const dataResponse = {
        ...dataProducto,
        detalles,
      };

      response
        .status(200)
        .json({ success: true, message: "OK", data: dataResponse });
      break;

    default:
      response
        .status(400)
        .json({ success: false, message: "method invalid.", data: null });
      break;
  }
};
