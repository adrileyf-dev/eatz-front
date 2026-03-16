"use server";

import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { categorie } from "@/libs/types";
import { Tags, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Categories() {
  const token = await getToken();

  const categories = await apiClient<categorie[]>("/categories", {
    token: token!,
  });

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorias</h1>

        <Button className="bg-primary text-white hover:bg-primary/90">
          Nova categoria
        </Button>
      </div>

      {/* LISTA */}
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="
            bg-[var(--color-bg-card)]
            border
            border-[var(--color-border)]
            rounded-lg
            p-5
            flex
            items-center
            justify-between
            transition
            hover:shadow-md
            hover:border-[var(--color-primary)]
            "
          >
            {/* esquerda */}
            <div className="flex items-center gap-4">
              <div
                className="
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-md
                bg-[var(--color-bg-muted)]
              "
              >
                <Tags className="w-5 h-5 text-[var(--color-primary)]" />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">{category.name}</span>

                <span className="text-xs text-[var(--color-text-muted)]">
                  ID: {category.id}
                </span>
              </div>
            </div>

            {/* direita */}
            <ChevronRight
              className="
              w-5
              h-5
              text-[var(--color-text-muted)]
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
