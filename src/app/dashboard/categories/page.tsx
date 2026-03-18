"use server";

import CategoryDialog from "@/components/forms/categories/category-dialog";
import CategoryItem from "@/components/forms/categories/category-item";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { categorie } from "@/libs/types";

export default async function Categories() {
  const token = await getToken();

  const categories = await apiClient<categorie[]>("/categories", {
    token: token!,
  });

  return (
    <div className="space-y-8">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorias</h1>

        <CategoryDialog />
      </div>

      {/* lista */}
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
