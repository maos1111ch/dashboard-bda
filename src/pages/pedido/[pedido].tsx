import { generarPedido } from "@/helpers/mock_data/pedidos";
import { Pedido } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const getServerSideProps = (async (context) => {
  const pedidoId = context.params?.pedido;
  if (!pedidoId || Array.isArray(pedidoId)) {
    return notFound();
  }

  const res = await fetch(`${process.env.API_URL}/api/pedido/${pedidoId}`);
  // const { data: pedido }: { data: Pedido } = await res.json();
  const pedido = null;
  return { props: { pedido } };
}) satisfies GetServerSideProps<{
  pedido: Pedido | null;
}>;

export default function Index({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const [pedido, setPedido] = useState<Pedido>();

  useEffect(() => {
    setPedido(generarPedido());
  }, []);

  if (!pedido) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="rounded-lg bg-white h-fit shadow-lg">
          <h2 className="sr-only" id="profile-overview-title">
            Pedido #{pedido.id_pedido.toString().padStart(8, '0')}
          </h2>
          <div className="bg-white p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Pedido #{pedido.id_pedido.toString().padStart(8, '0')}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {pedido.estado_pedido} - $ {pedido.total} - {pedido.fecha.toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    N° de Productos: {pedido.detalles.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link href={`/cliente/${pedido.cliente.id_cliente}`} className="rounded-b-lg border hover:bg-gray-50 hover:border-black hover:shadow-inner transition-colors duration-150 bg-white h-fit shadow-lg">
          <h2 className="sr-only" id="profile-overview-title">
            Cliente: {pedido.cliente.nombre}
          </h2>
          <div className="p-6 flex flex-row">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {pedido.cliente.nombre}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {pedido.cliente.direccion}, {pedido.cliente.ciudad}, {pedido.cliente.pais}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-full font-semibold my-auto ml-8">
              Ver Cliente &rarr;
            </div>
          </div>
        </Link>

        <div className="border-b border-gray-300 my-5  w-full" />
        <h1 className="mx-auto text-4xl font-light">Pedidos</h1>
        <div className="mt-12 space-y-8 sm:mt-16 min-h-screen w-1/2 mx-auto flex flex-col flex-wrap items-center">
          {pedido.detalles.map((detalle, index) => (
            <Link
              href={`/producto/${detalle.producto.id_producto}`}
              key={index}
              aria-labelledby={`${index}-heading`}
              className="border border-gray-200 py-8 px-4 rounded-lg min-w-full hover:border-black duration-150 transition-colors group shadow-inner"
            >
              <div className="flex items-baseline space-x-4 space-y-0">
                <h2
                  id={`${index}-heading`}
                  className="text-lg font-normal text-gray-900 md:flex-shrink-0"
                >
                   ${" "}{detalle.precio_unitario} x {detalle.cantidad} un. - {detalle.producto.nombre}
                </h2>
                <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                  <p className="text-sm font-medium text-gray-500">
                    {detalle.producto.categoria}
                  </p>
                  <div className="flex text-sm font-medium ml-5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <span className="text-indigo-600 hover:text-indigo-500">
                      Ver Producto
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
