"use server";

import CategoryDialog from "@/components/forms/categories/category-dialog";
import CategoryItem from "@/components/forms/categories/category-item";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { Category } from "@/libs/types";

export default async function Categories() {
  const token = await getToken();

  const categories = await apiClient<Category[]>("/categories", {
    token: token!,
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl  text-(--color-text)font-bold">
          Categorias
        </h1>
        <div className="text-sm sm:text-base mt-1"></div>
        <CategoryDialog />
      </div>

      {/* lista */}
      <div className="flex flex-col gap-1">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
