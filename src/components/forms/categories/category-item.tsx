"use client";
import { categorie } from "@/libs/types";
import { Tags } from "lucide-react";

interface Props {
  category: categorie;
}

export default function CategoryItem({ category }: Props) {
  return (
    <div
      className="
      bg-[var(--color-bg-card)]
      border
      border-[var(--color-border)]
      rounded-lg
      p-5
      flex
      items-center
      justify-between
      hover:shadow-md
      transition
    "
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-md bg-(--color-bg-muted) flex items-center justify-center">
          <Tags className="w-5 h-5 text-(--color-primary)" />
        </div>

        <div>
          <p className="font-semibold">{category.name}</p>
          <span className="text-xs text-(--color-text-muted)">
            {/* ID: {category.id} */}
          </span>
        </div>
      </div>
    </div>
  );
}
