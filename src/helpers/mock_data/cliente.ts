import { Cliente, Producto } from '@/types/negocio';
import { faker }from '@faker-js/faker';
import { randEnumValue } from './pedidos';

export const generarCliente = (): Cliente => ({
  id_cliente: faker.number.int({ max: 10000 }),
  nombre: faker.person.fullName(),
  ciudad: faker.location.city(),
  direccion: faker.location.streetAddress(),
  correo_electronico: faker.internet.email(),
  pais: faker.location.country(),
  pedidos: Array.from({ length: Math.ceil(Math.random() * 5)}, () => {
    return {
      id_pedido: faker.number.int({ max: 10000 }),
      estado_pedido: randEnumValue(),
      fecha: faker.date.past(),
      monto: Math.trunc(faker.number.float({ min: 10, max: 5000 }) * 100) / 100
    }
  })
});

export const generarClientes = (cantidad: number): Cliente[] => {
  return Array.from({ length: cantidad }, () => generarCliente());
};

