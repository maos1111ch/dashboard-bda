import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";

const getCliente = async (idCliente: number) => {
  return await sql`select * from clientes where id_cliente = ${idCliente};`;
};

const getPedidoByCliente = async (idCliente: number) => {
  return await sql`select * from pedidos where id_cliente = ${idCliente};`;
};

const getMontoPedido = async (idPedido: number) => {
  return await sql`
  SELECT
      p.id_pedido,
      COALESCE(SUM(dp.cantidad * dp.precio_unitario), 0) AS valor_total_pedido
  FROM
      Pedidos as p
  LEFT JOIN
      Detalles_pedido as dp ON p.id_pedido = dp.id_pedido
  WHERE
      p.id_pedido = ${idPedido}
  GROUP BY
    p.id_pedido;;
  `;
};

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
      const [cliente] = (await getCliente(parseInt(id))).rows;
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
