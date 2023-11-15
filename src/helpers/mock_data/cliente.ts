import { Cliente, Producto } from '@/types/negocio';
import { faker }from '@faker-js/faker';

export const generarCliente = (): Cliente => ({
  id_cliente: faker.number.int({ max: 10000 }),
  nombre: faker.person.fullName(),
  ciudad: faker.location.city(),
  direccion: faker.location.streetAddress(),
  correo_electronico: faker.internet.email(),
  pais: faker.location.country()
});

export const generarClientes = (cantidad: number): Cliente[] => {
  return Array.from({ length: cantidad }, () => generarCliente());
};

