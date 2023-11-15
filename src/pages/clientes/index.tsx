import ClientesTable from "@/components/clientes/table";
import { Cliente } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

export const getServerSideProps = (async (context) => {
  const { data: clientes }: { data: Cliente[] } = await(await fetch(`${process.env.API_URL}/api/clientes`)).json();
  return { props: { clientes } };
}) satisfies GetServerSideProps<{
  clientes: Cliente[];
}>;

export default function Index({clientes}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <>
      <ClientesTable clientes={clientes} />
    </>
  );
};
