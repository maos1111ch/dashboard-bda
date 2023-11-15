import {
  getClienteById,
  getMontoPedido,
  getPedidoByCliente,
} from "@/utils/queryDatabase";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
  } = req;

  if (!id || Array.isArray(id)) {
    res.status(400).json({ success: false, message: "Invalid id" });
    return;
  }

  switch (method) {
    case "GET":
      const [cliente] = (await getClienteById(parseInt(id))).rows;
      if (!cliente) {
        res.status(400).json({
          success: false,
          message: `Cliente: ${id} not found`,
          data: null,
        });
      }

      const pedidosCliente = (await getPedidoByCliente(parseInt(id))).rows;
      await Promise.all(
        pedidosCliente.map(async (pedido) => {
          const [monto] = (await getMontoPedido(pedido.id_pedido)).rows;
          pedido.monto = parseFloat(monto.valor_total_pedido);
        })
      );

      cliente.pedidos = pedidosCliente;

      res.status(200).json({ success: true, message: "OK", data: cliente });
      break;
    default:
      res
        .status(405)
        .json({ success: false, message: "method invalid.", data: null });
      break;
  }
};
