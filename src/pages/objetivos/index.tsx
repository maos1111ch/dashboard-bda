import { default as ObjetivoComponent } from "@/components/objetivos/objetivo";
import { Resumen, ResumenPedidos, Objetivo } from "@/types/negocio";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { useState } from "react";

export const getServerSideProps = (async (context) => {
  const { data: pedidos }: { data: ResumenPedidos } = await (
    await fetch(`${process.env.API_URL}/api/objetivos/ventas`)
  ).json();
  const { data: objetivos }: { data: Objetivo[] } = await (
    await fetch(`${process.env.API_URL}/api/objetivos`)
  ).json();
  const { data: resumen }: { data: Resumen[] } = await (
    await fetch(`${process.env.API_URL}/api/shortcuts`)
  ).json();
  return { props: { pedidos, objetivos, resumen } };
}) satisfies GetServerSideProps<{
  pedidos: ResumenPedidos;
  objetivos: Objetivo[];
  resumen: Resumen[];
}>;

export default function Index({
  resumen,
  pedidos,
  objetivos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mostrarTrimestrales, setMostrarTrimestrales] = useState(false);
  const [mostrarMensuales, setMostrarMensuales] = useState<string[]>([]);

  const toggleMostrarTrimestrales = () => {
    setMostrarTrimestrales(!mostrarTrimestrales);
    setMostrarMensuales([]);
  };

  const toggleMostrarMensuales = (meses: string[]) => {
    setMostrarMensuales((currentMensuales) => {
      const updatedMensuales = [...currentMensuales];
  
      meses.forEach((mes) => {
        if (currentMensuales.includes(mes)) {
          const indexToRemove = updatedMensuales.indexOf(mes);
          if (indexToRemove > -1) {
            updatedMensuales.splice(indexToRemove, 1);
          }
        } else {
          updatedMensuales.push(mes);
        }
      });
  
      return updatedMensuales;
    });
  };

  const objetivoAnual = objetivos.find(x => x.objetivo === 'Ventas Anuales');

  return (
    <>
      <div className="w-full">
        <div className="flex flex-row space-x-4 justify-center">
          {resumen.map((shortcut, index) => (
            <div className="w-full" key={index}>
              <ObjetivoComponent shortcut={shortcut} />
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-3xl my-5 font-semibold text-gray-900">Objetivos</h1>
      <div className="grid grid-cols-4 gap-4 w-full my-8">
        <div
          onClick={() => toggleMostrarTrimestrales()}
          className={`${objetivoAnual && objetivoAnual.valor < pedidos.ventas_anuales.total ? 'shadow-green-700' : 'shadow-red-700' } col-span-4 flex flex-col w-full text-center border border-gray-300 shadow-inner cursor-pointer hover:border-black transition-colors duration-150 p-4 rounded-lg`}
        >
          <span className="text-3xl text-gray-500 font-semibold">
            Ventas Anuales: {new Date().getFullYear()}
          </span>
          <span className="text-gray-500 font-bold">
            $ {pedidos.ventas_anuales.total}
          </span>
        </div>

        {mostrarTrimestrales &&
          pedidos.ventas_anuales.trimestres.map((trimestre, index) => {
            
            const objetivoTrimestral = objetivos.find(x => x.objetivo === 'Ventas Trimestrales');
            return (
            <div
              onClick={() =>
                toggleMostrarMensuales(trimestre.meses.map((x) => x.nombre))
              }
              key={index}
              className={`${objetivoTrimestral && objetivoTrimestral.valor < trimestre.total ? 'shadow-green-700' : 'shadow-red-700' } col-span-1 flex flex-col space-y-2 w-full h-fit text-center border border-gray-300 shadow-inner cursor-pointer hover:border-black transition-colors duration-150 p-4 rounded-lg`}
            >
              <span className="text-3xl text-gray-500 font-semibold">
                {trimestre.nombre}
              </span>
              <span className="text-gray-500 font-bold">$ {trimestre.total}</span>
              <div className="grid grid-cols-3 gap-2">
              {mostrarMensuales.some((mes) =>
                trimestre.meses.map((x) => x.nombre).includes(mes)
              ) &&
                trimestre.meses.map((mes, mesIndex) => {
                  const objetivoMensual = objetivos.find(x => x.objetivo === 'Ventas Mensuales');
                  return (
                  <div
                    key={mesIndex}
                    className={` ${objetivoMensual  && objetivoMensual.valor < mes.total ? 'shadow-green-700' : 'shadow-red-700' } col-span-1 flex flex-col w-full text-center border border-gray-300 shadow-inner hover:border-black transition-colors duration-150 p-2 rounded-lg`}
                  >
                    <span className="w-full text-center text-gray-500 font-semibold">
                      {mes.nombre}
                    </span>
                    <span className="text-gray-500 font-bold">$ {mes.total}</span>
                  </div>
                )})}
              </div>
            </div>
          )})}
      </div>
    </>
  );
}
