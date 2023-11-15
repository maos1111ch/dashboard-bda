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
  email: string;
  direccion: string;
  ciudad: string;
  pais: string;
};

export type Pedido = {
  id_pedido: number;
  cantidad: number;
  cliente: Cliente;
  fecha: Date;
};

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
  productos: Producto[];
};
