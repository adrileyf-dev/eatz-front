type OrderItem = {
  id: string;
  amount: number;
  totalprice: number;
  priceItem: number;
  observacao?: string;
  product: {
    id: string;
    name: string;
    price: number;
    description?: string;
    banner?: string;
  }; // O 'include' do backend garante isso aqui
  createdAt: Date;
  updatedAt: Date;
  order_id: string;
  product_id: string;
  active: boolean;

  user_id: string;
};
