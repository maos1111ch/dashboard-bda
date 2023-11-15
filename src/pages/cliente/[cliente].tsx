import { generarCliente } from "@/helpers/mock_data/cliente";
import { Cliente } from "@/types/negocio";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { useEffect, useState } from "react";

export const getServerSideProps = (async (context) => {
  const clienteId = context.params?.cliente;
  if (!clienteId || Array.isArray(clienteId)) {
    return notFound();
  }

  const res = await fetch(`${process.env.API_URL}/api/cliente/${clienteId}`);
  // const { data: cliente }: { data: Cliente} = await res.json()
  const cliente = null;
  return { props: { cliente } };
}) satisfies GetServerSideProps<{
  cliente: Cliente | null;
}>;

export default function Index({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const [cliente, setCliente] = useState<Cliente>();

  useEffect(() => {
    setCliente(generarCliente());
  }, []);

  if (!cliente) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="rounded-lg bg-white h-fit shadow-lg">
          <h2 className="sr-only" id="profile-overview-title">
            Perfil de {cliente.nombre}
          </h2>
          <div className="bg-white p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {cliente.nombre}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {cliente.direccion}, {cliente.ciudad}, {cliente.pais}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    N° de Pedidos: {cliente.pedidos.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-300 my-5  w-full" />
        <h1 className="mx-auto text-4xl font-light">Pedidos</h1>
        <div className="mt-12 space-y-8 sm:mt-16 min-h-screen w-1/2 mx-auto flex flex-col flex-wrap items-center">
          {cliente.pedidos.map((pedido) => (
            <Link
              href={`/pedido/${pedido.id_pedido}`}
              key={pedido.id_pedido}
              aria-labelledby={`${pedido.id_pedido}-heading`}
              className="border border-gray-200 py-8 px-4 rounded-lg min-w-full hover:border-black duration-150 transition-colors group shadow-inner"
            >
              <div className="flex items-baseline space-x-4 space-y-0">
                <h2
                  id={`${pedido.id_pedido}-heading`}
                  className="text-lg font-normal text-gray-900 md:flex-shrink-0"
                >
                  Pedido #{pedido.id_pedido.toString().padStart(8, "0")} - ${" "}
                  {pedido.monto} - {pedido.fecha.toLocaleDateString()}
                </h2>
                <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                  <p className="text-sm font-medium text-gray-500">
                    {pedido.estado_pedido}
                  </p>
                  <div className="flex text-sm font-medium ml-5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <span
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Ver Pedido
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
