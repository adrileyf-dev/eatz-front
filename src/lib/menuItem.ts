import { LogOut, Package, ShoppingCart, Tags, User } from "lucide-react";

export const menuItemApp = [
  { title: "Pedidos", href: "/dashboard", icon: ShoppingCart },
  { title: "Produtos", href: "/dashboard/products", icon: Package },
  { title: "Categorias", href: "/dashboard/categories", icon: Tags },
  { title: "Usuários", href: "/dashboard/register", icon: User },
];
