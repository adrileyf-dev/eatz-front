"use client";

import { useToast } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function SocketManager() {
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const socket = io("http://localhost:3333");

    // --- EVENTOS DE PEDIDOS ---
    socket.on("order.created", (data) => {
      showToast(`Novo Pedido: Mesa ${data.table}`, "success");
      router.refresh();
    });

    socket.on("order.completed", (data) => {
      showToast(`Pedido da Mesa ${data.table} finalizado!`, "success");
      router.refresh();
    });

    // --- EVENTOS DE ESTOQUE (Exemplo para outros forms) ---
    socket.on("product.low_stock", (data) => {
      showToast(`Alerta: Produto ${data.name} com estoque baixo!`, "error");
      router.refresh(); // Atualiza a página caso o usuário esteja na lista de produtos
    });

    // --- EVENTOS DE ITEMS ---item.updated
    socket.on("item.added", (data) => {
      showToast(`Produto ${data.name} adicionado a : ${data.table}`, "success");
      router.refresh();
    });
    socket.on("item.updated", (data) => {
      showToast(
        `Produto ${data.name} Alterado Via Admin a : ${data.table}`,
        "success",
      );
      router.refresh();
    });

    return () => {
      socket.disconnect();
    };
  }, [router, showToast]);

  return null;
}
