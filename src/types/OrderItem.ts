type OrderItem = Partial<{
  id: string;
  amount: number;
  totalprice: number;
  priceItem: number;
  createdAt: Date;
  updatedAt: Date;
  order_id: string;
  product_id: string;
  active: boolean;
  observacao: string;
  user_id: string;
}>;
