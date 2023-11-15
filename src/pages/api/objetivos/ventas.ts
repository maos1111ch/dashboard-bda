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

      const dataResponse = {
        ventas_anuales: {
          total: parseFloat(dataFacturacionTotal.valor_total_ventas),
          trimestres: [
            {
              nombre: "ENE - MAR",
              total: ventasQObj.ventas_q1,
              meses: [
                {
                  total: ventasObj.ventas_m01,
                  nombre: "ENERO",
                },
                {
                  total: ventasObj.ventas_m02,
                  nombre: "FEBRERO",
                },
                {
                  total: ventasObj.ventas_m03,
                  nombre: "MARZO",
                },
              ],
            },
            {
              nombre: "ABR - JUN",
              total: ventasQObj.ventas_q2,
              meses: [
                {
                  total: ventasObj.ventas_m04,
                  nombre: "ABRIL",
                },
                {
                  total: ventasObj.ventas_m05,
                  nombre: "MAYO",
                },
                {
                  total: ventasObj.ventas_m06,
                  nombre: "JUNIO",
                },
              ],
            },
            {
              nombre: "JUL - SEP",
              total: ventasQObj.ventas_q3,
              meses: [
                {
                  total: ventasObj.ventas_m07,
                  nombre: "JULIO",
                },
                {
                  total: ventasObj.ventas_m08,
                  nombre: "AGOSTO",
                },
                {
                  total: ventasObj.ventas_m09,
                  nombre: "SEPTIEMBRE",
                },
              ],
            },
            {
              nombre: "OCT - DIC",
              total: ventasQObj.ventas_q4,
              meses: [
                {
                  total: ventasObj.ventas_m10,
                  nombre: "OCTUBRE",
                },
                {
                  total: ventasObj.ventas_m11,
                  nombre: "NOVIMIEBRE",
                },
                {
                  total: ventasObj.ventas_m12,
                  nombre: "DICIEMBRE",
                },
              ],
            },
          ],
        },
      };

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
