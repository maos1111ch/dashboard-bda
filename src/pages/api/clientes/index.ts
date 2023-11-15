import {
  getClientes,
  getMontoPedido,
  getPedidoByCliente,
} from "@/utils/queryDatabase";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const clientes = (await getClientes()).rows;
      await Promise.all(
        clientes.map(async (cliente) => {
          const pedidosCliente = (
            await getPedidoByCliente(parseInt(cliente.id_cliente))
          ).rows;
          await Promise.all(
            pedidosCliente.map(async (pedido) => {
              const [monto] = (await getMontoPedido(pedido.id_pedido)).rows;
              pedido.monto = parseFloat(monto.valor_total_pedido);
            })
          );
          cliente.pedidos = pedidosCliente;
        })
      );

      res.status(200).json({ success: true, message: "OK.", data: clientes });
      break;
    default:
      res
        .status(405)
        .json({ success: false, message: "method invalid.", data: null });
      break;
  }
};
