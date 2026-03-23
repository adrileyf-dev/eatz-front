"use client";

import Profile from "@/components/profile/profile";
import { authenticatedAdmin, getUserLog } from "@/libs/libsUtil";

export default async function Dashboard() {
  // se NÃO estiver logado → vai para login
  /* if (!user) {
    redirect("/login");
  }
*/
  return (
    <div>
      <h1>
        <Profile />
      </h1>
    </div>
  );
}
