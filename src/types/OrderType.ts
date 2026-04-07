import { User } from "@/libs/types";
import { ProductsTypes } from "./ProductTypes";

export interface Order {
  id: string;
  table: number;
  name: string;
  draft: boolean;
  status: boolean;
  user: User;
  produtos: ProductsTypes;
  items?: OrderItem[];
}
