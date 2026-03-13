import { removeToken } from "@/libs/getCookies";
import { redirect } from "next/navigation";

export async function ServiceLogout() {
  await removeToken();
  redirect("/login");
}
