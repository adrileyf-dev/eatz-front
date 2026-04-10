"use client";

import { Card } from "@/components/ui/card";
import { Order } from "@/types/OrderType";
import { formatCurrency, formatDateTime } from "@/Utilits/format";
interface OrderItemProps {
  order: Order;
}

export default function OrderListItems({ order }: OrderItemProps) {
  // 1. Verificação de segurança (Impede que o código abaixo rode se não houver order)
  if (!order) {
    return <div className="p-4 text-center text-black">Carregando...</div>;
  }

  // 2. Cálculo do total (Convertendo explicitamente para número)
  const totalSomaPedido =
    order.item?.reduce((acc, curr) => {
      const valor = Number(curr.totalprice) || 0;
      return acc + valor;
    }, 0) || 0;

  // 2. Cálculo do total (Convertendo explicitamente para número)
  const totalItems =
    order.item?.reduce((acc, curr) => {
      const valor = Number(curr.amount) || 0;
      return acc + valor;
    }, 0) || 0;

  // Array vazio garante que só rode uma vez

  // 3. Renderização Principal
  return (
    <div className="w-full">
      <Card className="bg-app-card border-app-border transition-shadow hover:shadow-md text-black overflow-hidden flex flex-col h-full group">
        <div className="relative w-full overflow-hidden text-black p-4 flex flex-col">
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

          <div className="mt-4 overflow-y-auto max-h-40 custom-scrollbar">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 border-b border-gray-100 pb-1">
              Itens do Pedido
            </p>

            {Array.isArray(order.item) && order.item.length > 0 ? (
              <ul className="space-y-2">
                {order.item.map((item) => (
                  <li
                    key={item.id}
                    className="text-xs flex flex-col border-b border-gray-50 last:border-0 pb-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {item.amount}x {item.product?.name || "Produto"}
                      </span>
                      <span className="font-mono text-gray-600">
                        {formatCurrency(Number(item.totalprice))}
                      </span>
                    </div>
                    {item.observacao && (
                      <span className="text-[10px] text-orange-500 italic">
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

        <div className="px-4 py-3 bg-black/5 mt-auto flex justify-between items-center border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-gray-500">
              Total ({totalItems} itens)
            </span>
            <span className="font-bold text-base text-green-700">
              {formatCurrency(totalSomaPedido)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
