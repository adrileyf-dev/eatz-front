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
    const id = formData.get("id") as string | null;

    if (!name || name.trim() === "") {
      return {
        success: false,
        message: "Nome da Categoria Obrigatorio",
        errors: {
          name: "Nome é obrigatório",
        },
      };
    }

    const payLoad = { name };

    if (id) {
      // Editar
      await apiClient<Category>(`/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(payLoad),
        token,
      });
    } else {
      // Criar
      await apiClient<Category>("/categories", {
        method: "POST",
        body: JSON.stringify(payLoad),
        token,
      });
    }

    revalidatePath("/dashboard/categories");

    return {
      success: true,
      message: id
        ? "Categoria atualizada com sucesso"
        : "Categoria cadastrada com sucesso",
    };
  } catch (err: any) {
    console.error("Category error:", err);

    return {
      success: false,
      message: err?.message || "Erro ao salvar categoria",
      errors: {},
    };
  }
}
