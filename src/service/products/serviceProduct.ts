"use server";

import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { GeralState } from "@/libs/typeState";
import { revalidatePath } from "next/cache";

export async function ServiceProducts(
  prevState: GeralState | null,
  formData: FormData,
): Promise<GeralState> {
  try {
    const token = await getToken();

    const id = formData.get("id") as string | null;
    const isEdit = !!id;

    const form = new FormData();

    form.append("name", String(formData.get("name")));

    // Tratamento do preço
    const priceRaw = String(formData.get("price"));
    form.append("price", priceRaw.replace(",", "."));

    form.append("category_id", String(formData.get("category_id")));
    form.append("description", String(formData.get("description") || ""));
    form.append("active", String(formData.get("active") === "on"));

    // O Insomnia também mostra que você envia um slug vazio,
    // se a sua API reclamar de falta de slug, descomente a linha abaixo:
    // form.append("slug", "");

    // 🔥 O SEGREDO ESTAVA AQUI!
    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      form.append("file", file); // Mantém como "file"
      form.append("uploadImage", "true"); // <- ESTA É A PEÇA QUE FALTAVA!
    } else {
      // Se for edição e não tiver foto nova, talvez sua API exija false
      form.append("uploadImage", "false");
    }

    if (isEdit) {
      await apiClient(`/products/${id}`, {
        method: "PUT",
        body: form,
        token,
      });
    } else {
      await apiClient(`/products`, {
        method: "POST",
        body: form,
        token,
      });
    }

    revalidatePath("/dashboard/products");

    return {
      success: true,
      message: isEdit
        ? "Produto atualizado com sucesso"
        : "Produto criado com sucesso",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || "Erro ao salvar produto",
    };
  }
}
