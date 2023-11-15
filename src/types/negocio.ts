export type Producto = {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
};

export type Cliente = {
  id_cliente: number;
  nombre: string;
  correo_electronico: string;
  direccion: string;
  ciudad: string;
  pais: string;
}

export type Pedido = {
  id_pedido: number;
  cliente: Cliente; 
  fecha: Date;
  estado_pedido: string;
  detalles: DetallePedido[]
}

export type DetallePedido = {
  id_detalle_pedido: number;
  precio_unitario: number;
  producto: Producto;
  cantidad: number;
}

export type ResumenPedidosPorProducto = { 
  producto: Producto;
  monto: {
    mensual: number;
    trimestral: number;
    anual: number;
  }
}

export type VentasPorCategoria = {
  categoria: string;
  productos: ResumenPedidosPorProducto[];
}

export enum EstadosPedidos {
  EnProceso = 'En proceso',
  Entregado = 'Entregado'
}