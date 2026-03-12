"use server";

import { apiClient } from "@/libs/api";
import { GeralState } from "@/libs/typeState";
import { User } from "@/libs/types";

export async function registerAction(
  prevState: GeralState | null,
  formData: FormData,
): Promise<GeralState> {
  try {
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: (formData.get("role") as string) || "STAFF",
    };

    const user = await apiClient<User>("/users", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: "Registro realizado com sucesso",
    };
  } catch (err) {
    console.error("Register error:", err);

    if (err instanceof Error) {
      return {
        success: false,
        error: err.message,
      };
    }

    return {
      success: false,
      error: "Erro ao criar conta",
    };
  }
}
