"use server";

import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { revalidatePath } from "next/cache";

type ServiceResponse = {
  success: boolean;
  error?: string;
};

export async function ServiceFinishOrder(
  order_id: string,
): Promise<ServiceResponse> {
  if (!order_id) {
    return { success: false, error: "Falha ao finalizar pedido" };
  }

  try {
    const token = await getToken();

    await apiClient("/orders/close", {
      method: "PUT",
      body: JSON.stringify({ order_id }),
      token,
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard");

    return { success: true };
  } catch (err) {
    console.error("Erro ao finalizar pedido:", err);

    return {
      success: false,
      error: "Falha ao finalizar pedido",
    };
  }
}
