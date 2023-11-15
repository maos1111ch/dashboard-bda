import ClientesTable from "@/components/clientes/table";
import { Cliente } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { useEffect, useState } from "react";
import { generarClientes } from "@/helpers/mock_data/cliente";

export const getServerSideProps = (async (context) => {


  const res = await fetch(`${process.env.API_URL}/api/productos`);
  // const { data: clientes }: { data: Cliente[] } = await res.json()
  const clientes = null;
  return { props: { clientes } };
}) satisfies GetServerSideProps<{
  clientes: Cliente[] | null;
}>;

export default function Index({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const [clientes, setClientes] = useState<Cliente[]>();

  useEffect(() => {
    setClientes(generarClientes(10));
  }, []);

  if (!clientes) {
    return <>Loading...</>;
  }

  return (
    <>
      <ClientesTable clientes={clientes} />
    </>
  );
};
