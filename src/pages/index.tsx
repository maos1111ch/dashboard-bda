import Objetivo from "@/components/objetivos/objetivo";
import VentasTable from "@/components/ventas/table";
import { generarProductos } from "@/helpers/mock_data/productos";
import { generarResumenPedidosPorProducto } from "@/helpers/mock_data/resumen_pedidos_por_producto";
import { Resumen, ResumenPedidosPorProducto } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { useState, useEffect } from "react";

export const getServerSideProps = (async (context) => {
  const res = await fetch(`${process.env.API_URL}/api/productos`);
  const { data: productos }: {data: ResumenPedidosPorProducto[]} = await res.json()
  const { data: resumen }: { data: Resumen[] } = await (
    await fetch(`${process.env.API_URL}/api/shortcuts`)
  ).json();

  if(!productos) {
    return {
      notFound: true
    }
  }
  return { props: { productos, resumen } };
}) satisfies GetServerSideProps<{
  productos: ResumenPedidosPorProducto[];
  resumen: Resumen[];
}>;

export default function Index({
  resumen,
  productos
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-row space-x-4 justify-center">
          {resumen.map((resumen, index) => (
            <div className="w-full" key={index}>
              <Objetivo shortcut={resumen} />
            </div>
          ))}
        </div>
      </div>
      <VentasTable productos={productos} />
    </>
  );
}
