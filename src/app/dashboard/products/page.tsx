"use server";

import ProductDialog from "@/components/forms/products/product-dialog";
import ProductItem from "@/components/forms/products/Product-Item";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { ProductsTypes } from "@/types/ProductTypes";
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

      {/* lista */}
      <div className="flex flex-col gap-4">
        {prods.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
