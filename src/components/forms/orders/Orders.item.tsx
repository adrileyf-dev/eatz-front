"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServiceFinishOrder } from "@/service/orders/servicesOrders";
import { Order } from "@/types/OrderType";
import { formatCurrency, formatDateTime } from "@/Utilits/format";
import { useState } from "react";
import { OrderModalDetails } from "./OrderModalDetails";
import OrderRodape from "./OrdersRodape";

interface OrderItemProps {
  order: Order;
}
export default function OrderListItems({ order }: OrderItemProps) {
  if (!order) {
    return <div className="p-4 text-center text-black">Carregando...</div>;
  }
  const [modalOpen, setModalOpen] = useState(false);
  const totalSomaPedido =
    order.item?.reduce(
      (acc, curr) => acc + (Number(curr.totalprice) || 0),
      0,
    ) || 0;
  const totalItems =
    order.item?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;
  const handleFinishOrder = async () => {
    try {
      const result = await ServiceFinishOrder(order.id);
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
    }
  };

  return (
    // Adicionei h-full aqui para que o container externo também preencha a altura da grid
    <div className="w-full h-full">
      <Card
        className="bg-app-card border-app-border transition-shadow hover:shadow-md
        text-black overflow-hidden flex flex-col h-full group"
      >
        {/* O segredo está no flex-1 aqui: ele vai crescer e ocupar todo o espaço disponível,
            empurrando o OrderRodape para o final do card */}
        <div className="relative w-full overflow-hidden text-black p-4 flex flex-col flex-1">
          <div className="text-sm mb-3">
            <span className="font-bold">Data: </span>
            <span>{formatDateTime(order.createdAt)}</span>
          </div>

          <div className="flex justify-between items-start">
            <label className="font-bold text-lg uppercase tracking-wider">
              Mesa {order.table}
            </label>
            <span
              className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                order.status
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.status ? "Concluído" : "Aberto"}
            </span>
          </div>

          <div className="mt-2">
            <p className="text-sm font-semibold">
              Cliente: {order.name || "Não informado"}
            </p>
            <p className="text-[10px] text-gray-500 uppercase">
              Atendente: {order.user?.name || "Sistema"}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 border-b border-gray-100 pb-1">
              Itens do Pedido
            </p>

            {/* Ajustei a altura mínima para evitar que o card "pule" visualmente */}
            <div className="overflow-y-auto max-h-40 min-h-[60px] custom-scrollbar">
              {Array.isArray(order.item) && order.item.length > 0 ? (
                <ul className="space-y-2">
                  {order.item.slice(0, 3).map((item) => (
                    <li key={item.id} className="text-xs sm:text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-bold uppercase">
                          {item.amount}x {item.product?.name || "Produto"}
                        </span>
                        <span className="font-mono text-gray-600">
                          {formatCurrency(Number(item.totalprice))}
                        </span>
                      </div>
                      {item.observacao && (
                        <span className="text-[10px] text-orange-500 italic block">
                          Obs: {item.observacao}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[10px] italic text-gray-400">
                  Nenhum item registrado.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* O rodapé agora ficará sempre colado na parte inferior devido ao flex-1 acima */}
        <OrderRodape
          totalItems={totalItems}
          totalSomaPedido={totalSomaPedido}
          onOpenModal={() => setModalOpen(true)}
        />
        <Button
          onClick={handleFinishOrder}
          size="sm"
          variant="outline"
          className="flex w-full items-center gap-2 border-slate-200  bg-red-500/50 text-slate-700
           hover:bg-white xl:w-auto active:scale-95
           transition-all shadow-sm"
        >
          Finalizar Pedidos{" "}
        </Button>
      </Card>

      <OrderModalDetails
        order={order}
        isOpen={modalOpen}
        onClose={setModalOpen}
      />
    </div>
  );
}
