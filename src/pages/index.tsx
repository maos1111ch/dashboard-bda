import DataComponent from "@/components/appData/dataComponent";
import VentasTable from "@/components/ventas/table";
import { generarProductos } from "@/helpers/mock_data/productos";
import { generarResumenPedidosPorProducto } from "@/helpers/mock_data/resumen_pedidos_por_producto";
import { ResumenPedidosPorProducto } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { useState, useEffect } from "react";
import shortcuts from "./api/shortcuts";


export const getServerSideProps = (async (context) => {
  const res = await fetch(`${process.env.API_URL}/api/productos`)
  // const { data: productos }: {data: ResumenPedidosPorProducto[]} = await res.json()
  const {data:resShortcuts}:any = await (await fetch(`${process.env.API_URL}/api/shortcuts`)).json()
  const productos = null;
  return { props: { productos, shortcuts:resShortcuts} }
}) satisfies GetServerSideProps<{
  productos: ResumenPedidosPorProducto[] | null
  shortcuts: any
}>

export default function Index({shortcuts}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [productos, setProductos] = useState<ResumenPedidosPorProducto[]>();

  useEffect(() => {
    const productos = generarProductos(10)
    setProductos(generarResumenPedidosPorProducto(productos));
  }, []);

  if (!productos) {
    return <>Loading...</>;
  }
  console.log(shortcuts)
  return (
    <>
      <DataComponent shortcuts={shortcuts}/>
      <VentasTable productos={productos} />
    </>
  );
}
