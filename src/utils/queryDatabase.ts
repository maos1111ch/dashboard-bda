import { sql } from "@vercel/postgres";

export {
  getClienteById,
  getPedidoByCliente,
  getMontoPedido,
  getPedidoById,
  getDetallesPedido,
};

const getClienteById = async (idCliente: number) => {
  return await sql`select * from clientes where id_cliente = ${idCliente};`;
};

const getPedidoById = async (idPedido: number) => {
  return await sql`select * from pedidos where id_pedido = ${idPedido};`;
};

const getPedidoByCliente = async (idCliente: number) => {
  return await sql`select * from pedidos where id_cliente = ${idCliente};`;
};

const getDetallesPedido = async (idPedido: number) => {
  return await sql`select * from detalles_pedido  where id_pedido = ${idPedido};`;
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
      p.id_pedido;
    `;
};
