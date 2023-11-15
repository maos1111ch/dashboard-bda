import { NextApiRequest, NextApiResponse } from "next";
import {
  getClienteById,
  getDetallesPedido,
  getPedidoById,
  getMontoPedido,
} from "@/utils/queryDatabase";

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
      const [pedido] = (await getPedidoById(parseInt(id))).rows;
      const [cliente] = (await getClienteById(parseInt(pedido.id_cliente)))
        .rows;
      const detalles = (await getDetallesPedido(parseInt(pedido.id_pedido)))
        .rows;
      const [dataMonto] = (await getMontoPedido(parseInt(pedido.id_pedido)))
        .rows;

      const dataResponse = {
        ...pedido,
        monto: dataMonto.valor_total_pedido,
        cliente,
        detalles,
      };
      console.log("detalles", detalles);

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
