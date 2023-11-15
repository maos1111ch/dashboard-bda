import { getProductos, getValoresDeVenta } from "@/utils/queryDatabase";
import { NextApiResponse, NextApiRequest } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      const productos = (await getProductos()).rows;

      await Promise.all(
        productos.map(async (producto) => {
          const montos = (await getValoresDeVenta(producto.id_producto)).rows;
          const monto = {
            mensual: montos[0].valor_total_venta,
            trimestral: montos[1].valor_total_venta,
            anual: montos[2].valor_total_venta,
          };
          producto.monto = monto;
        })
      );

      response
        .status(200)
        .json({ success: true, message: "OK", data: productos });
      break;
    default:
      response
        .status(400)
        .json({ success: false, message: "method invalid.", data: null });
      break;
  }
};
