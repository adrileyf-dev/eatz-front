import { MobileSideBar } from "@/components/dashboard/mobileSidebar";
import SiderBar from "@/components/dashboard/sidebar";
import { authenticatedAdmin } from "@/libs/libsUtil";
import React from "react";

export default async function DashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authenticatedAdmin();
  return (
    <div className="container">
      {/*SiderBar desktop */}
      <SiderBar username={user.name} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileSideBar />
        <main className=" container max-w-full px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
