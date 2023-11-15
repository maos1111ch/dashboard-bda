import { sql } from "@vercel/postgres";

export {
  getClienteById,
  getPedidoByCliente,
  getMontoPedido,
  getPedidoById,
  getDetallesPedido,
  getFacturacionTotal,
  getCantidadVentas,
  getCantidadClientes,
  getProductoById,
  getPedidosByProducto,
  getFacturacionFechas,
  getFacturacionQ,
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

const getFacturacionTotal = async () => {
  return await sql`SELECT
    COALESCE(SUM(dp.cantidad * dp.precio_unitario), 0) AS valor_total_ventas
  FROM
    Detalles_pedido dp;`;
};

const getCantidadVentas = async () => {
  return await sql`SELECT
    COALESCE(SUM(dp.cantidad), 0) AS cantidad_total_ventas
  FROM
    Detalles_pedido dp;`;
};

const getCantidadClientes = async () => {
  return await sql`SELECT count(*) as cantidad_clientes FROM clientes`;
};

const getProductoById = async (idProducto: number) => {
  return await sql`SELECT * FROM productos where id_producto = ${idProducto}`;
};

const getPedidosByProducto = async (idProducto: number) => {
  return await sql`SELECT id_pedido, cantidad FROM detalles_pedido where id_producto = ${idProducto}`;
};

const getFacturacionFechas = async () => {
  return await sql`SELECT
    to_char(p.fecha_pedido, 'YYYY-MM') AS mes,
    COALESCE(SUM(dp.cantidad * dp.precio_unitario), 0) AS valor_total_ventas
  FROM
    Detalles_pedido dp
  JOIN
    Pedidos p ON dp.id_pedido = p.id_pedido
  GROUP BY
    mes
  ORDER BY
    mes;`;
};

const getFacturacionQ = async () => {
  return await sql`WITH Quartiles AS (
    SELECT
      dp.id_producto,
      dp.cantidad * dp.precio_unitario AS valor_venta,
      NTILE(4) OVER (ORDER BY dp.cantidad * dp.precio_unitario) AS cuartil
    FROM
      Detalles_pedido dp
  )
  SELECT
    cuartil,
    COALESCE(SUM(valor_venta), 0) AS valor_total_cuartil
  FROM
    Quartiles
  GROUP BY
    cuartil
  ORDER BY
    cuartil;
  `;
};
