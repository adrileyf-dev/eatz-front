import type { User } from "@/libs/types";

export interface Order {
  id: string;
  table: number;
  name?: string;
  user?: User;
  status: boolean;
  draft: boolean;
  createdAt: string;
  item: OrderItem[]; // No seu JSON era 'item' no singular
}
