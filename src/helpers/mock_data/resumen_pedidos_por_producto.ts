import { faker } from "@faker-js/faker";
import { ResumenPedidosPorProducto, Producto } from "@/types/negocio";


export const generarResumenPedidosPorProducto = (productos: Producto[]): ResumenPedidosPorProducto[] => (productos.map((producto) => ({
  producto,
  monto: {
    mensual: Math.trunc(faker.number.float({ min: 1000, max: 5000 }) * 100) / 100,
    trimestral: Math.trunc(faker.number.float({ min: 3000, max: 15000 }) * 100) / 100,
    anual: Math.trunc(faker.number.float({ min: 12000, max: 60000 }) * 100) / 100
  }
})));