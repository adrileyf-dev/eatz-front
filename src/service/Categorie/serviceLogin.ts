"use server";
import { apiClient } from "@/libs/api";
import AuthRespose from "@/libs/AuthResponse";
import { setToken } from "@/libs/getCookies";
import { GeralState } from "@/libs/typeState";

export async function ServiceLogin(
  prevState: GeralState | null,

  formData: FormData,
) {
  try {
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const response = await apiClient<AuthRespose>("/sessions", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    //    console.log(payload);
    await setToken(response.token);
    return {
      success: true,
      message: "Login Realizado com sucesso",
    };
  } catch (err) {
    console.error("Login error:", err);

    if (err instanceof Error) {
      return {
        success: false,
        error: err.message,
      };
    }
  }
}
