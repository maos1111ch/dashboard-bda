import { generarPedidos } from "@/helpers/mock_data/pedidos";
import { generarProductos } from "@/helpers/mock_data/productos";
import { generarResumenPedidosPorProducto } from "@/helpers/mock_data/resumen_pedidos_por_producto";
import { Pedido } from "@/types/negocio";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

interface ClienteProps {}

const Cliente: FC<ClienteProps> = () => {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>();

  useEffect(() => {
    setPedidos(generarPedidos(Math.floor(Math.random() * 5)));
  }, []);

  if (!pedidos) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>

        <div className="mt-12 space-y-16 sm:mt-16">
          {pedidos.map((pedido) => (
            <section
              key={pedido.id_pedido}
              aria-labelledby={`${pedido.id_pedido}-heading`}
            >
              <div className="space-y-1 md:flex md:items-baseline md:space-x-4 md:space-y-0">
                <h2
                  id={`${pedido.id_pedido}-heading`}
                  className="text-lg font-medium text-gray-900 md:flex-shrink-0"
                >
                  Pedido #{pedido.id_pedido.toString().padStart(8, "0")}
                </h2>
                <div className="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1">
                  <p className="text-sm font-medium text-gray-500">
                    {pedido.estado_pedido}
                  </p>
                  <div className="flex text-sm font-medium">
                    <a
                      href={`/pedido/${pedido.id_pedido}`}
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Ver Pedido
                    </a>
                  </div>
                </div>
              </div>

              <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                {pedido.detalles.map((detalle) => (
                  <div
                    key={detalle.producto.id_producto}
                    className="py-6 sm:flex"
                  >
                    <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                      <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                        <h3 className="text-sm font-medium text-gray-900">
                          <a href={`/producto/${detalle.producto.id_producto}`}>
                            {detalle.producto.nombre}
                          </a>
                        </h3>
                        <p className="text-sm text-gray-500">
                          <span>{detalle.producto.categoria}</span>{" "}
                          <span
                            className="mx-1 text-gray-400"
                            aria-hidden="true"
                          >
                            &middot;
                          </span>{" "}
                          <span>{detalle.producto.descripcion}</span>
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                          $ {detalle.producto.precio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cliente;
