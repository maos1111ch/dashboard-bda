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
    fecha_pedido: string;
    estado_pedido: EstadosPedidos;
    monto: number;
  }[];
};

export type Resumen = {
  title: string;
  value: string;
};

export type Pedido = {
  id_pedido: number;
  cliente: {
    id_cliente: number;
    nombre: string;
    ciudad: string;
    pais: string;
    direccion: string;
  };
  fecha_pedido: Date;
  estado_pedido: string;
  detalles: {
    id_pedido: number;
    id_producto: number;
    precio_unitario: number;
    cantidad: number;
    producto: {
      id_producto: number;
      nombre: string;
      categoria: string;
    };
  }[];
  total: number;
};

export type Objetivo = { 
  id_objetivo: number;
  objetivo: string;
  valor: number;
}


export type ResumenPedidos = {
  ventas_anuales: {
    total: number;
    trimestres: {
      total: number;
      nombre: string;
      meses: {
        total: number;
        nombre: string;
      }[]
    }[]
  }
}

export type ResumenPedidosPorProducto = {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  detalles: {
    id_pedido: number;
    cantidad: number;
  }[];
  monto: {
    mensual: number;
    trimestral: number;
    anual: number;
  };
};

export type VentasPorCategoria = {
  categoria: string;
  productos: ResumenPedidosPorProducto[];
};

export enum EstadosPedidos {
  EnProceso = "En proceso",
  Entregado = "Entregado",
}
