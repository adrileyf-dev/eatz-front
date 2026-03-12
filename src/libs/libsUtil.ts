import { redirect } from "next/navigation";
import { apiClient } from "./api";
import { getToken } from "./getCookies";
import { User } from "./types";

export async function getUserLog(): Promise<User | null> {
  try {
    const token = await getToken();

    if (!token) {
      return null;
    }
    const user = await apiClient<User>("/me", { token: token });
    return user;
  } catch (error) {
    return null;
  }
}
export async function authenticatedAdmin(): Promise<User> {
  const user = await getUserLog();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return user;
}
