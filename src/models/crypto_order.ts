export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export interface Pedido {
  id: string;
  razao_social: string;
  email: string;
  vr_total: string;
  data_inicio: string;
  data_entrega: string;
  status_devolucao: string;
}


export interface Marca {
  id: string;
  nome: string;
  identificador: string;
}

// ??
export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  orderDetails: string;
  orderDate: string;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amount: number;
  cryptoCurrency: string;
  currency: string;
}


export interface Cliente {
  id: string;
  razao_social: string;
  documento: string;
  email: string;
  nome: string;
  inscricao_estadual: string
}

export interface Produto {
  id: string;
  fabricante: string;
  categoria: Categoria;
  nome: string;
  valor: number;
}

export interface Categoria {
  id: string;
  descricao: string;
}
