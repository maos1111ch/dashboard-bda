import { Pedido } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";

export const getServerSideProps = (async (context) => {
  const pedidoId = context.params?.pedido;
  if(!pedidoId || Array.isArray(pedidoId)) {
    return notFound();
  }

  const res = await fetch(`${process.env.API_URL}/api/pedido/${pedidoId}`)
  const { data: pedido }: { data: Pedido } = await res.json()
  return { props: { pedido } }
}) satisfies GetServerSideProps<{
  pedido: Pedido
}>

export default function Index({
  pedido
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (<>{router.query.pedido}</>)
}

