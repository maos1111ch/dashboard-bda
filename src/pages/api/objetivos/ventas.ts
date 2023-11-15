import { NextApiRequest, NextApiResponse } from "next";
import { getFacturacionMes, getFacturacionTotal } from "@/utils/queryDatabase";
import { ResumenPedidos } from "@/types/negocio";

function obtenerNombreMes(numeroMes: number) {
  const meses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];
  return meses[numeroMes - 1];
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      const dataFacturacionMeses = (await getFacturacionMes()).rows;
      const [dataFacturacionTotal] = (await getFacturacionTotal()).rows;

      // Crear trimestres
      const trimestres = [
        { nombre: "ENE - MAR", meses: [1, 2, 3] },
        { nombre: "ABR - JUN", meses: [4, 5, 6] },
        { nombre: "JUL - SEP", meses: [7, 8, 9] },
        { nombre: "OCT - DIC", meses: [10, 11, 12] },
      ];

      // Inicializar la respuesta
      const dataResponse: ResumenPedidos = {
        ventas_anuales: {
          total: parseFloat(dataFacturacionTotal.valor_total_entregado),
          trimestres: [],
        },
      };


      // Recorrer trimestres
      for (const trimestre of trimestres) {
        const trimestreData: {
          nombre: string;
          total: number;
          meses: { total: number; nombre: string;}[]
        } = {
          nombre: trimestre.nombre,
          total: 0, // Inicializar total del trimestre
          meses: [],
        };

        // Recorrer meses dentro del trimestre
        for (const mes of trimestre.meses) {
          const valorMes = parseFloat(
            dataFacturacionMeses[mes - 1].valor_total_entregado
          );
          trimestreData.total += valorMes;

          const mesData: { total: number; nombre: string;} = {
            total: valorMes,
            nombre: obtenerNombreMes(mes),
          };

          trimestreData.meses.push(mesData);
        }

        dataResponse.ventas_anuales.trimestres.push(trimestreData);
      }

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
