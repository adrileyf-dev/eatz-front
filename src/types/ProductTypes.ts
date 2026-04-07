import { Category } from "@/libs/types";

export type ProductsTypes = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  //items: Item[];
  createdAt: Date;
  updatedAt: Date;
  category_id: string;
  category: Category;
  price: number;
  banner?: string;
  observacao: string;
};
