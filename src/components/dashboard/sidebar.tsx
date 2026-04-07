"use client";
import { ServiceLogout } from "@/service/category/serviceLogout";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

import { Button } from "../ui/button";
import { menuItemApp } from "./../../lib/menuItem";

interface SidebarProps {
  username: string;
}

export default function Sidebar({ username }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className="text-pink-500 text-2xl font-extrabold hidden lg:block text-center">
        ANA BURGER
      </div>
      <div className="text-center text-2x0 ">
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
        <Button type="submit" className={styles.logoutButton}>
          <LogOut size={18} />
          <span>Sair</span>
        </Button>
      </form>
    </aside>
  );
}
