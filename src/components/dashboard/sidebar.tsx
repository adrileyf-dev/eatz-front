"use client";
import { LogOut, Package, ShoppingCart, Tags, User } from "lucide-react";
import styles from "./sidebar.module.css";
import { usePathname } from "next/navigation";
import { ServiceLogout } from "@/service/serviceLogout";
import Link from "next/link";

interface SidebarProps {
  username: string;
}

const menuItem = [
  { title: "Pedidos", href: "/dashboard", icon: ShoppingCart },
  { title: "Produtos", href: "/dashboard/products", icon: Package },
  { title: "Categorias", href: "/dashboard/categories", icon: Tags },
  { title: "Usuários", href: "/dashboard/register", icon: User },
];

export default function Sidebar({ username }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>EATZ</div>
      <div className={styles.user}>
        Usuário: <strong>{username}</strong>
      </div>
      <nav className={styles.menu}>
        {menuItem.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={`${styles.link} ${isActive ? styles.active : styles.link}`}
            >
              <Icon size={18} />
              {menu.title}
            </Link>
          );
        })}
      </nav>

      <form className={styles.logoutForm} action={ServiceLogout}>
        <button type="submit" className={styles.logoutButton}>
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </form>
    </aside>
  );
}
