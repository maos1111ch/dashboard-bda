import { useRouter } from "next/router";
import { FC } from "react";

interface ObjetivoProps {
}

const Objetivo: FC<ObjetivoProps> = () => {
  const router = useRouter();
  return (<>{router.query.objetivo}</>)
}

export default Objetivo;