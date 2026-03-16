"use client";
import { LogOut, Package, ShoppingCart, Tags, User } from "lucide-react";
import styles from "./sidebar.module.css";
import { usePathname } from "next/navigation";
import { ServiceLogout } from "@/service/serviceLogout";
import Link from "next/link";

import { menuItemApp } from "./../../lib/menuItem";
import { Button } from "../ui/button";

interface SidebarProps {
  username: string;
}

export default function Sidebar({ username }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>EATZ</div>
      <div className={styles.user}>
        Usuário: <strong>{username}</strong>
      </div>
      <nav className={styles.menu}>
        {menuItemApp.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={`${styles.link} ${isActive ? styles.active : styles.linkN}`}
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
