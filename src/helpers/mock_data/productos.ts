import { Producto } from "@/types/negocio";
import { faker } from "@faker-js/faker";

export const generarProducto = (): Producto => ({
  id_producto: faker.number.int({ max: 10000 }),
  nombre: faker.commerce.productName(),
  descripcion: faker.commerce.productDescription(),
  precio: Math.trunc(faker.number.float({ min: 10, max: 5000 }) * 100) / 100,
  categoria: faker.commerce.department(),
  detalles: Array.from({ length: Math.floor(Math.random() * 5) }, () => {
    return {
      id_pedido: faker.number.int({ max: 10000 }),
      cantidad: faker.number.int({ min: 2, max: 20 }),
    };
  }),
});

export const generarProductos = (cantidad: number): Producto[] => {
  return Array.from({ length: cantidad }, () => generarProducto());
};
