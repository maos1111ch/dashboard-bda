import Link from "next/link";
import { FC } from "react";
import { Cliente } from "@/types/negocio";

interface ClientesTableProps {
  clientes: Cliente[];
}

const ClientesTable: FC<ClientesTableProps> = ({ clientes }) => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Resumen de Clientes
            </h1>
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
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Cantidad de Pedidos
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Ciudad
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Ver Cliente</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {clientes.map((cliente) => (
                    <tr key={cliente.id_cliente} className="even:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        <div className="grid grid-cols-2 w-32">
                          <span className="text-gray-500 font-light">
                            {cliente.id_cliente}
                          </span>{" "}
                          <span>{cliente.nombre}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cliente.pedidos.length}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cliente.ciudad}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cliente.pedidos.length && "$ " + Math.trunc(cliente.pedidos.map(x => x.monto).reduce((acc, cv) => acc += cv, 0) * 100) / 100}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <Link
                          href={`/cliente/${cliente.id_cliente}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver Cliente
                          <span className="sr-only">, {cliente.nombre}</span>
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

export default ClientesTable;
