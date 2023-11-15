import { EstadosPedidos, Pedido } from "@/types/negocio";
import { faker } from "@faker-js/faker";
import { generarCliente } from "./cliente";

export function randEnumValue() {
  const index = Math.floor(Math.random() * Object.keys(EstadosPedidos).length);
  return Object.values(EstadosPedidos)[index];
}

export const generarPedido = (): Pedido => ({
  id_pedido: faker.number.int({ max: 10000 }),
  cliente: generarCliente(),
  fecha: faker.date.recent(),
  estado_pedido: randEnumValue(),
  detalles: Array.from({ length: Math.floor(Math.random() * 5) }, () => {
    return {
      producto: {
        id_producto: faker.number.int({ max: 10000 }),
        categoria: faker.commerce.department(),
        nombre: faker.commerce.productName(),
      },
      cantidad: faker.number.int({ max: 20, min: 1 }),
      precio_unitario: Math.trunc(faker.number.float({ min: 10, max: 200 }) * 100) / 100,
    };
  }),
  total: Math.trunc(faker.number.float({ min: 10, max: 5000 }) * 100) / 100
});

export const generarPedidos = (cantidad: number): Pedido[] => {
  return Array.from({ length: cantidad }, () => generarPedido());
};
