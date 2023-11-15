import ProductosTable from "@/components/productos/table";
import { Cliente, Producto } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async (context) => {
  const { data: productos } = await (
    await fetch(`${process.env.API_URL}/api/productos`)
  ).json();
  return { props: { productos } };
}) satisfies GetServerSideProps<{
  productos: Producto[];
}>;

export default function Index({
  productos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <ProductosTable productos={productos} />
    </>
  );
}
