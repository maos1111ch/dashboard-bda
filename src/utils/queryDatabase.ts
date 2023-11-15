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
  getFacturacionMes,
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
  return await sql` SELECT
    COALESCE(CAST(SUM(dp.cantidad * dp.precio_unitario) AS NUMERIC), 0) AS valor_total_entregado
  FROM
    Detalles_pedido dp
    JOIN Pedidos p ON dp.id_pedido = p.id_pedido
  WHERE
    p.estado_pedido = 'Entregado';
  `;
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

const getFacturacionMes = async () => {
  return await sql`
  SELECT
    EXTRACT(MONTH FROM p.fecha_pedido) AS mes,
    COALESCE(SUM(dp.cantidad * dp.precio_unitario), 0) AS valor_total_entregado
  FROM
    Detalles_pedido dp
    JOIN Pedidos p ON dp.id_pedido = p.id_pedido
  WHERE
    p.estado_pedido = 'Entregado'
  GROUP BY
    mes
  `;
};

const getFacturacionQ = async () => {
  return await sql`WITH Trimestres AS (
    SELECT
      p.id_pedido,
      dp.cantidad * dp.precio_unitario AS valor_pedido,
      CASE
        WHEN EXTRACT(MONTH FROM p.fecha_pedido) BETWEEN 1 AND 3 THEN 'Primer Trimestre'
        WHEN EXTRACT(MONTH FROM p.fecha_pedido) BETWEEN 4 AND 6 THEN 'Segundo Trimestre'
        WHEN EXTRACT(MONTH FROM p.fecha_pedido) BETWEEN 7 AND 9 THEN 'Tercer Trimestre'
        WHEN EXTRACT(MONTH FROM p.fecha_pedido) BETWEEN 10 AND 12 THEN 'Cuarto Trimestre'
      END AS trimestre
    FROM
      Detalles_pedido dp
      JOIN Pedidos p ON dp.id_pedido = p.id_pedido
    WHERE
      p.estado_pedido = 'Entregado'
  )
  SELECT
    trimestre,
    COALESCE(SUM(valor_pedido), 0) AS valor_total_trimestre
  FROM
    Trimestres
  GROUP BY
    trimestre
  
  `;
};
