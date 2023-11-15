import { generarPedido } from "@/helpers/mock_data/pedidos";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const getPedido = async (idPedido: number) => {
  return await sql`
  SELECT
  p.id_pedido,
  p.fecha_pedido,
  json_agg(
      json_build_object(
          'id_detalle_pedido', d.id_detalle_pedido,
          'id_producto', d.id_producto,
          'cantidad', d.cantidad,
          'precio_unitario', d.precio_unitario,
          'producto', json_build_object(
              'id_producto', pr.id_producto,
              'nombre', pr.nombre,
              'descripcion', pr.descripcion,
              'precio', pr.precio,
              'categoria', pr.categoria
          )
      )
  ) AS detalles
FROM
  Pedidos p
JOIN
  Detalles_pedido d ON p.id_pedido = d.id_pedido
JOIN
  Productos pr ON d.id_producto = pr.id_producto
WHERE p.id_pedido = ${idPedido}
GROUP BY
  p.id_pedido, p.fecha_pedido
ORDER BY
  p.id_pedido;
`;
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, query: { id } } = request;

  if (!id || Array.isArray(id)) {
    response.status(400).json({ success: false, message: "invalid id" });
    return;
  }

  switch (method) {
    case "GET":
      const result = await getPedido(parseInt(id));
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
