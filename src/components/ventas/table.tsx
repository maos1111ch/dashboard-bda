import Link from "next/link";
import { FC } from "react";
import { ResumenPedidosPorProducto } from "@/types/negocio";

interface VentasTableProps {
  productos: ResumenPedidosPorProducto[];
}

const VentasTable: FC<VentasTableProps> = ({ productos }) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Resumen de ventas
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A continuacion se presenta una lista exhaustiva de todas las
              ventas realizadas por nuestra empresa durante el último año
              fiscal. Incluye información específica sobre cada transacción.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Producto
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Monto en Ventas
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Ventas Totales
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Categoria
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Ver Detalle</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {productos.map((resumenProducto) => (
                    <tr
                      key={resumenProducto.producto.id_producto}
                      className="even:bg-gray-50"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {resumenProducto.producto.nombre}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <div className="grid grid-cols-2 border-t border-b">
                            <span className="mr-2">Mensual</span>{" "}
                            <span className="font-semibold text-right">
                              $ {resumenProducto.monto.mensual}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 border-b">
                            <span className="mr-2">Trimestral</span>{" "}
                            <span className="font-semibold text-right">
                              $ {resumenProducto.monto.trimestral}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 border-b">
                            <span className="mr-2">Anual</span>{" "}
                            <span className="font-semibold text-right">
                              $ {resumenProducto.monto.anual}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {resumenProducto.producto.detalles.length}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {resumenProducto.producto.categoria}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <Link
                          href={`/producto/${resumenProducto.producto.id_producto}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver producto
                          <span className="sr-only">
                            , {resumenProducto.producto.nombre}
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VentasTable;
