"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ServiceLogout } from "@/service/category/serviceLogout";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";

import { useState } from "react";
import { Button } from "../ui/button";
import { menuItemApp } from "./../../lib/menuItem";

interface SidebarProps {
  username: string;
}
export function MobileSideBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-50 border-b border-b-blue-500 border-bs-indigo-500">
        <div className="flex h-16 items-center justify-between px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Menu className="h-6 w-6"></Menu>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-72  border-b-blue-500" side="left">
              <SheetHeader className="border-b border-b-blue-500 p-6">
                <SheetTitle className="text-1 font-bold text-blue-700"></SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-4 space-y-4">
                {menuItemApp.map((menu) => {
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
              <div className="border-t p-4">
                <form className={styles.logoutForm} action={ServiceLogout}>
                  <Button
                    type="submit"
                    variant={"ghost"}
                    className="w-full justify-start gap-3 text-black font-bold hover:text-blue-800 hover:bg-transparent"
                  >
                    <LogOut className={"w-5 h-5"} size={18} />
                    <span>Sair</span>
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-bold">
            <span className="text-lg font-bold  "> EATZ</span>
          </h1>
          <div className=" w-10"></div>
        </div>
      </header>
    </div>
  );
}
