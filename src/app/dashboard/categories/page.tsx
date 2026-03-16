"use server";

import CategoryForm from "@/components/forms/categories/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { categorie } from "@/libs/types";
import { Tags } from "lucide-react";
export default async function Categories() {
  const token = await getToken();

  const categories = await apiClient<categorie[]>("/categories", {
    token: token!,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <button>TESTE</button>
      </div>

      {categories.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="bg-app-card border-app-border transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tags className="w-5 h-5 text-primary group-hover:text-primary/80" />
                  <span>{category.name}</span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p>{category.id}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
