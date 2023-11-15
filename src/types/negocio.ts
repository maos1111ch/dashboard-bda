export type Producto = {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  detalles: {
    id_pedido: number;
    cantidad: number;
  }[];
};

export type Cliente = {
  id_cliente: number;
  nombre: string;
  correo_electronico: string;
  direccion: string;
  ciudad: string;
  pais: string;
  pedidos: {
    id_pedido: number;
    fecha: Date;
    estado_pedido: EstadosPedidos;
    monto: number;
  }[]
};

export type Pedido = {
  id_pedido: number;
  cliente: Cliente; 
  fecha: Date;
  estado_pedido: string;
  detalles: {
    precio_unitario: number;
    cantidad: number;
    producto: {
      id_producto: number;
      nombre: string;
      categoria: string;
    }
  }[];
  total: number;
}

export type ResumenPedidosPorProducto = {
  producto: Producto;
  monto: {
    mensual: number;
    trimestral: number;
    anual: number;
  };
};

export type VentasPorCategoria = {
  categoria: string;
  productos: ResumenPedidosPorProducto[];
}

export enum EstadosPedidos {
  EnProceso = 'En proceso',
  Entregado = 'Entregado'
}