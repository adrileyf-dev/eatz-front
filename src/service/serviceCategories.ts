"use server";

import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { Category } from "@/libs/types";
import { GeralState } from "@/libs/typeState";
import { revalidatePath } from "next/cache";

export async function ServiceCategories(
  prevState: GeralState | null,
  formData: FormData,
): Promise<GeralState> {
  try {
    const token = await getToken();

    const name = formData.get("name") as string;

    // ✅ VALIDAÇÃO
    if (!name || name.trim() === "") {
      return {
        success: false,
        message: "Nome da Categoria Obrigatorio ",
        errors: {
          name: "Nome é obrigatório",
        },
      };
    }

    const payLoad = { name };

    await apiClient<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(payLoad),
      token,
    });

    // ✅ atualiza lista
    revalidatePath("/dashboard/categories");

    return {
      success: true,
      message: "Categoria cadastrada com sucesso",
    };
  } catch (err: any) {
    console.error("Register error:", err);

    // 🔥 ERRO VINDO DA API
    const apiError = err?.response?.data;

    return {
      success: false,
      message: apiError?.message || "Erro ao cadastrar categoria",
      errors: apiError?.errors || {},
    };
  }
}
