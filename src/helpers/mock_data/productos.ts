import { Producto } from '@/types/negocio';
import { faker }from '@faker-js/faker';

export const generarProducto = (): Producto => ({
  id_producto: faker.number.int({ max: 10000 }),
  nombre: faker.commerce.productName(),
  descripcion: faker.commerce.productDescription(),
  precio: Math.trunc(faker.number.float({ min: 10, max: 5000 }) * 100) / 100,
  categoria: faker.commerce.department()
});

export const generarProductos = (cantidad: number): Producto[] => {
  return Array.from({ length: cantidad }, () => generarProducto());
};

