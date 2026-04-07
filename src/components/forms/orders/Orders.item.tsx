"use client";

import { Card } from "@/components/ui/card";
import { Order } from "@/types/OrderType";

interface OrderItemProps {
  order: Order;
}

export default function OrderListItems({ order }: OrderItemProps) {
  // Caso o order não venha preenchido, mostramos o estado de carregamento
  if (!order) return <div className="p-4 text-center">Carregando...</div>;

  return (
    <div className="w-full">
      <Card className="bg-app-card border-app-border transition-shadow hover:shadow-md text-black overflow-hidden flex flex-col h-full group">
        {/* CONTAINER PRINCIPAL: Mantendo suas classes originais */}
        <div className="relative w-full aspect-video sm:h-48 rounded-t-xl overflow-hidden text-black p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <label className="font-bold text-lg uppercase tracking-wider">
                Mesa {order.table}
              </label>
              {/* Status visual baseado no seu booleano order.status */}
              <span
                className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${order.status ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
              >
                {order.status ? "Concluído" : "Aberto"}
              </span>
            </div>

            <div className="mt-1">
              <p className="text-sm font-semibold">
                Cliente: {order.name || "Não informado"}
              </p>
              <p className="text-[10px] text-gray-500 uppercase">
                ID: {order.user?.name || "Usuário desconhecido"}
                createdAt
              </p>
            </div>
          </div>

          {/* LISTAGEM DOS ITENS (PRODUTOS) DO PEDIDO */}
          <div className="mt-4 overflow-y-auto max-h-24 custom-scrollbar">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 border-b border-gray-100">
              Itens do Pedido
            </p>
            {order.items && order.items.length > 0 ? (
              <ul className="space-y-1">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="text-xs flex justify-between items-center"
                  >
                    <span className="truncate pr-2">
                      {item.amount}x {item.observacao || "Produto"}
                    </span>
                    <span className="font-mono font-medium">
                      R${" "}
                      {item.totalprice?.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
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

        {/* RODAPÉ DO CARD (Opcional, para mostrar o total se desejar) */}
        <div className="px-4 py-3 bg-black/5 mt-auto flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase text-gray-500">
            Total do Pedido
          </span>
          <span className="font-bold text-sm">
            R${" "}
            {order.items
              ?.reduce((acc, curr) => acc + (curr.totalprice || 0), 0)
              .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </Card>
    </div>
  );
}
