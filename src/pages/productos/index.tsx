import { generarProductos } from "@/helpers/mock_data/productos";
import { FC, useEffect, useState } from "react";
import ProductosTable from "@/components/productos/table";
import { Cliente, Producto } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { notFound } from "next/navigation";

export const getServerSideProps = (async (context) => {


  const res = await fetch(`${process.env.API_URL}/api/productos`);
  // const { data: cliente }: { data: Cliente} = await res.json()
  const cliente = null;
  return { props: { cliente } };
}) satisfies GetServerSideProps<{
  cliente: Cliente | null;
}>;

export default function Index({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const [productos, setProductos] = useState<Producto[]>();

  useEffect(() => {
    setProductos(generarProductos(10));
  }, []);

  if (!productos) {
    return <>Loading...</>;
  }
  return (
    <>
      <ProductosTable productos={productos} />
    </>
  );
};
