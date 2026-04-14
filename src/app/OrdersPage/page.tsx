// app/orders/page.tsx (ou seu caminho de página)
import OrderItem from "@/components/forms/orders/Orders.item";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { Order } from "@/types/OrderType";
import { PackageSearch } from "lucide-react";

export default async function OrderPage() {
  const token = await getToken();

  // O cache: "no-store" garante que o router.refresh() pegue dados novos
  const orders = await apiClient<Order[]>("/orders?status=false", {
    method: "GET",
    cache: "no-store",
    token: token!,
  });
  const activeOrders = orders?.filter((order) => order.status === false) || [];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* O ouvinte do Socket fica aqui, apenas 1 conexão para toda a página */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Pedidos</h1>
      </div>

      {activeOrders && activeOrders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {activeOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center w-full py-24 px-4 border-2
         border-dashed border-muted-foreground/25 rounded-xl bg-white/50"
        >
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
