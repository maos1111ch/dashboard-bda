import { EstadosPedidos, Pedido } from '@/types/negocio';
import { faker }from '@faker-js/faker';
import { generarCliente } from './cliente';
import { generarDetallesPedido } from './detalle_pedido';

function randEnumValue() {
  const index= Math.floor(Math.random() * Object.keys(EstadosPedidos).length);
  return Object.values(EstadosPedidos)[index];
}

export const generarPedido = (): Pedido => ({
  id_pedido: faker.number.int({ max: 10000 }),
  cliente: generarCliente(),
  fecha: faker.date.recent(),
  estado_pedido: randEnumValue(),
  detalles: generarDetallesPedido(Math.floor(Math.random() * 5) || 1)
});

export const generarPedidos = (cantidad: number): Pedido[] => {
  return Array.from({ length: cantidad }, () => generarPedido());
};

