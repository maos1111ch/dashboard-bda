import { NextApiRequest, NextApiResponse } from "next";
import {
  getFacturacionFechas,
  getFacturacionTotal,
  getFacturacionQ,
} from "@/utils/queryDatabase";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      const [dataFacturacionTotal] = (await getFacturacionTotal()).rows;
      const dataFacturacionMeses = (await getFacturacionFechas()).rows;
      const dataFacturacionQ = (await getFacturacionQ()).rows;

      //Facturacion mensual
      const ventasObj: { [key: string]: number } = {};
      dataFacturacionMeses.forEach((item) => {
        const mesNumero = parseInt(item.mes.split("-")[1], 10);
        ventasObj[`ventas_m${mesNumero.toString().padStart(2, "0")}`] =
          parseFloat(item.valor_total_ventas);
      });

      //Facturacion Q
      const ventasQObj = {
        ventas_q1: parseFloat(
          dataFacturacionQ.find((item) => item.cuartil === 1)
            ?.valor_total_cuartil || "0"
        ),
        ventas_q2: parseFloat(
          dataFacturacionQ.find((item) => item.cuartil === 2)
            ?.valor_total_cuartil || "0"
        ),
        ventas_q3: parseFloat(
          dataFacturacionQ.find((item) => item.cuartil === 3)
            ?.valor_total_cuartil || "0"
        ),
        ventas_q4: parseFloat(
          dataFacturacionQ.find((item) => item.cuartil === 4)
            ?.valor_total_cuartil || "0"
        ),
      };

      const dataResponse = [
        {
          ventas_anuales: parseFloat(dataFacturacionTotal.valor_total_ventas),
          ...ventasObj,
          ...ventasQObj,
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
