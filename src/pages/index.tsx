import VentasTable from "@/components/ventas/table";
import { generarProductos } from "@/helpers/mock_data/productos";
import { generarResumenPedidosPorProducto } from "@/helpers/mock_data/resumen_pedidos_por_producto";
import { ResumenPedidosPorProducto } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { useState, useEffect } from "react";


export const getServerSideProps = (async (context) => {
  const res = await fetch(`${process.env.API_URL}/api/productos`)
  // const { data: productos }: {data: ResumenPedidosPorProducto[]} = await res.json()
  const productos = null;
  return { props: { productos } }
}) satisfies GetServerSideProps<{
  productos: ResumenPedidosPorProducto[] | null
}>

export default function Index({ }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [productos, setProductos] = useState<ResumenPedidosPorProducto[]>();

  useEffect(() => {
    const productos = generarProductos(10)
    setProductos(generarResumenPedidosPorProducto(productos));
  }, []);

  if (!productos) {
    return <>Loading...</>;
  }
  return (
    <>
      <VentasTable productos={productos} />
    </>
  );
}
