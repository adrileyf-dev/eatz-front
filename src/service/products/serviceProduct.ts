"use server";

import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { GeralState } from "@/libs/typeState";
import { revalidatePath } from "next/cache";
import { ProductsTypes } from "@/types/ProductTypes";

export async function ServiceProducts(
  prevState: GeralState | null,
  formData: FormData,
): Promise<GeralState> {
  try {
    const token = await getToken();

    // 🔥 PEGANDO DADOS DO FORM
    const id = formData.get("id") as string | null;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category_id = formData.get("category_id") as string;
    const description = formData.get("description") as string;
    const active = formData.get("active") === "on";

    const isEdit = !!id;
    console.log(isEdit);

    // ✅ VALIDAÇÃO BÁSICA
    if (!name) {
      return {
        success: false,
        message: "Nome é obrigatório",
      };
    }

    // 🔥 PAYLOAD COMPLETO
    const payLoad = {
      name,
      price,
      category_id,
      description,
      active,
    };

    // 🔥 CREATE OU UPDATE
    if (isEdit) {
      await apiClient<ProductsTypes>(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(payLoad),
        token,
      });
    } else {
      await apiClient<ProductsTypes>("/products", {
        method: "POST",
        body: JSON.stringify(payLoad),
        token,
      });
    }

    // ✅ revalida lista
    revalidatePath("/dashboard/products");

    return {
      success: true,
      message: isEdit
        ? "Produto atualizado com sucesso"
        : "Produto cadastrado com sucesso",
    };
  } catch (err: any) {
    console.error("Product error:", err);

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
  await apiClient(`/products/${id}`, { method: "DELETE", token });
  revalidatePath("/dashboard/products");
}
