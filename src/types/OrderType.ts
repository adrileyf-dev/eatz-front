export interface Order {
  id: string;
  table: number;
  name?: string;
  status: boolean;
  draft: boolean;
  createdAt: string;
  item: OrderItem[]; // No seu JSON era 'item' no singular
}
