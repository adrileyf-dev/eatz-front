"use server";

import OrderItem from "@/components/forms/orders/Orders.item";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { Order } from "@/types/OrderType";
import { PackageSearch } from "lucide-react";

export default async function OrderPage() {
  // se NÃO estiver logado → vai para login
  /* if (!user) {
    redirect("/login");
  }
*/

  const token = await getToken();
  const orders = await apiClient<Order[]>("/orders", {
    method: "GET",
    cache: "no-store",
    token: token!,
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl  text-(--color-text)font-bold">
          Pedidos
        </h1>
        <div className="text-sm sm:text-base mt-1"></div>
      </div>

      {orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-24 px-4 border-2 border-dashed border-muted-foreground/25 rounded-xl bg-white/50">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4">
            <PackageSearch className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-1">
            Nenhum Pedido encontrado
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm text-center">
            Você ainda não possui Pedidos
          </p>
        </div>
      )}
    </div>
  );
}
