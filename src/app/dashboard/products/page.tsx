"use server";

import ProductDialog from "@/components/forms/products/product-dialog";
import ProductItem from "@/components/forms/products/Product-Item";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { ProductsTypes } from "@/types/ProductTypes";
import { PackageSearch } from "lucide-react";

export default async function Products() {
  const token = await getToken();

  const prods = await apiClient<ProductsTypes[]>("/products", {
    token: token!,
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl  text-(--color-text)font-bold">
          Produtos
        </h1>
        <div className="text-sm sm:text-base mt-1"></div>
        <ProductDialog />
      </div>

      {prods && prods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* lista */}
          {prods.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full py-24 px-4 border-2 border-dashed border-muted-foreground/25 rounded-xl bg-white/50">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4">
            <PackageSearch className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-1">
            Nenhum produto encontrado
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm text-center">
            Você ainda não possui produtos cadastrados. Clique no botão de
            adicionar para começar.
          </p>
        </div>
      )}
    </div>
  );
}
