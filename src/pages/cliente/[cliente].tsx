import { useRouter } from "next/router";
import { FC } from "react";

interface ClienteProps {
}

const Cliente: FC<ClienteProps> = () => {
  const router = useRouter();
  return (<>{router.query.cliente}</>)
}

export default Cliente;