"use server";

import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { Category } from "@/libs/types";
import { GeralState } from "@/libs/typeState";

export async function ServiceCategories(
  prevState: GeralState | null,
  formData: FormData,
): Promise<GeralState> {
  try {
    const token = await getToken();
    console.log(token);

    const payLoad = { name: formData.get("name") as string };
    console.log(payLoad);

    await apiClient<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(payLoad),
      token,
    });

    return {
      success: true,
      message: "Categoria cadastrada com sucesso",
    };
  } catch (err) {
    return {
      success: false,
      error: "Erro ao cadastrar categoria",
    };
  }
}
