"use server";

import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { revalidatePath } from "next/cache";

export default async function deleteProductAction(product_id: string) {
  try {
    if (!product_id) {
      return {
        success: false,
        error: "Erro: ID do produto não fornecido",
      };
    }

    const token = await getToken();

    // AJUSTE AQUI: Mudamos de `/products/${product_id}` para `/products?product_id=${product_id}`
    await apiClient(`/products?product_id=${product_id}`, {
      method: "DELETE",
      token,
    });

    revalidatePath("/dashboard/products");

    return { success: true, message: "Produto excluído com sucesso" };
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return {
      success: false,
      error: "Ocorreu um erro ao tentar excluir o produto.",
    };
  }
}
