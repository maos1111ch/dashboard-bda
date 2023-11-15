import { useRouter } from "next/router";
import { FC } from "react";

interface ProductoProps {
}

const Producto: FC<ProductoProps> = () => {
  const router = useRouter();
  return (<>{router.query.producto}</>)
}

export default Producto;