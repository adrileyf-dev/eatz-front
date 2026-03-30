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
    form.append("price", String(formData.get("price")));
    form.append("category_id", String(formData.get("category_id")));
    form.append("description", String(formData.get("description") || ""));
    form.append("active", String(formData.get("active") === "on"));

    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      form.append("file", file);
    }

    console.log(formData);

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
    const apiError = err?.response?.data;

    return {
      success: false,
      message: apiError?.message || "Erro ao salvar produto",
      errors: apiError?.errors || {},
    };
  }
}

export async function deleteProduct(id: string) {
  const token = await getToken();

  await apiClient(`/products/${id}`, {
    method: "DELETE",
    token,
  });

  revalidatePath("/dashboard/products");
}
