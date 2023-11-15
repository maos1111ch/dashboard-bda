import { NextApiRequest, NextApiResponse } from "next";
import {
  getFacturacionTotal,
  getCantidadVentas,
  getCantidadClientes,
} from "@/utils/queryDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      const [dataFacturacion] = (await getFacturacionTotal()).rows;
      const [dataCantVentas] = (await getCantidadVentas()).rows;
      const [dataClientes] = (await getCantidadClientes()).rows;

      const dataResponse = [
        {
          title: "Facturacion total",
          value: parseFloat(dataFacturacion.valor_total_ventas),
        },
        {
          title: "Total de ventas",
          value: parseInt(dataCantVentas.cantidad_total_ventas),
        },
        {
          title: "Clientes Registrados",
          value: parseInt(dataClientes.cantidad_clientes),
        },
      ];

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
