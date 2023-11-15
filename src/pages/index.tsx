import VentasTable from "@/components/ventas/table";
import { ResumenPedidosPorProducto } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";


export const getServerSideProps = (async (context) => {
  const res = await fetch(`${process.env.API_URL}/api/productos`)
  const { data: productos } = await res.json()
  return { props: { productos } }
}) satisfies GetServerSideProps<{
  productos: ResumenPedidosPorProducto[]
}>

export default function Index({ productos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <VentasTable productos={productos} />
    </>
  );
}
