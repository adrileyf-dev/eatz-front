"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types/OrderType";
import { formatCurrency } from "@/Utilits/format";
import { Hash, Package, ReceiptText, User } from "lucide-react";

interface OrderModalDetailsProps {
  order: Order;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export function OrderModalDetails({
  order,
  isOpen,
  onClose,
}: OrderModalDetailsProps) {
  const total =
    order.item?.reduce(
      (acc, curr) => acc + (Number(curr.totalprice) || 0),
      0,
    ) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-none bg-slate-50 shadow-2xl">
        <DialogHeader className="p-6 bg-white border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tighter">
              <ReceiptText className="w-5 h-5 text-blue-600" />
              Mesa {order.table}
            </DialogTitle>
            <span
              className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                order.status
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {order.status ? "Finalizado" : "Em Aberto"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
              <User className="w-3 h-3" /> {order.name || "Consumidor"}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium justify-end">
              <Hash className="w-3 h-3" /> ID:{" "}
              {order.id.substring(0, 8).toUpperCase()}
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 overflow-y-auto max-h-[50vh] custom-scrollbar">
          <p
            className="text-[10px] font-bold text-gray-400
          uppercase mb-4 tracking-widest flex items-center gap-2"
          >
            <Package className="w-3 h-3" /> Itens do Pedido
          </p>

          <div className="space-y-4">
            {order.item?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col border-b border-dashed border-gray-200 pb-3 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <span className="font-mono text-xs bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 h-fit">
                      {item.amount}x
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase text-slate-800 leading-tight">
                        {item.product?.name}
                      </p>
                      {item.observacao && (
                        <p className="text-[11px] text-orange-600 bg-orange-50 px-2 py-1 rounded-sm mt-1 inline-block italic border border-orange-100">
                          Obs: {item.observacao}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {formatCurrency(Number(item.totalprice))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-500 uppercase">
              Total Geral
            </span>
            <span className="text-2xl font-black text-green-700">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
