import { DetallePedido } from '@/types/negocio';
import { faker }from '@faker-js/faker';
import { generarProducto } from './productos';

export const generarDetallePedido = (): DetallePedido => ({
  id_detalle_pedido: faker.number.int({ max: 10000 }),
  cantidad: faker.number.int({ max: 20 }),
  precio_unitario: parseFloat(faker.commerce.price()),
  producto: generarProducto(),
});

export const generarDetallesPedido = (cantidad: number): DetallePedido[] => {
  return Array.from({ length: cantidad }, () => generarDetallePedido());
};

