import { generarProducto } from "@/helpers/mock_data/productos";
import { Producto } from "@/types/negocio";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

interface ProductoProps {
}

const Producto: FC<ProductoProps> = () => {
  const [producto, setProducto] = useState<Producto>();

  useEffect(() => {
    setProducto(generarProducto());
  }, []);

  if (!producto) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="rounded-lg bg-white h-fit shadow-lg">
          <h2 className="sr-only" id="profile-overview-title">
            Producto #{producto.id_producto}
          </h2>
          <div className="bg-white p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {producto.nombre}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    Categoria: {producto.categoria} - Precio:  $ {producto.precio}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    N° de Pedidos: {producto.detalles.length}
                  </p>
                  <p className="font-bold text-lg text-black mt-4">
                    Descripción
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {producto.descripcion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-300 my-5  w-full" />
        <h1 className="mx-auto text-4xl font-light">Pedidos</h1>
        <div className="mt-12 space-y-8 sm:mt-16 min-h-screen w-1/2 mx-auto flex flex-col flex-wrap items-center">
          {producto.detalles.map((detalle) => (
            <Link
              href={`/pedido/${detalle.id_pedido}`}
              key={detalle.id_pedido}
              aria-labelledby={`${detalle.id_pedido}-heading`}
              className="border border-gray-200 py-8 px-4 rounded-lg min-w-full hover:border-black duration-150 transition-colors group shadow-inner"
            >
              <div className="flex items-baseline space-x-4 space-y-0">
                <h2
                  id={`${detalle.id_pedido}-heading`}
                  className="text-lg font-normal text-gray-900 md:flex-shrink-0"
                >
                  Pedido #{detalle.id_pedido.toString().padStart(8, "0")} - {" "}
                  {detalle.cantidad} un. - $ {Math.trunc(detalle.cantidad * producto.precio)}
                </h2>
                <div className="w-full">
                  <div className="flex justify-end text-sm font-medium ml-5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
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

export default Producto;