<<<<<<< HEAD
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
=======
export interface Order {
  id: string;
  table: number;
  name?: string;
  status: boolean;
  draft: boolean;
  createdAt: string;
  item: OrderItem[]; // No seu JSON era 'item' no singular
}
>>>>>>> 61929167da57b892010f230a0aa83ad9b3d4ad4a
