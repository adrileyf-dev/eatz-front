"use client";
import { Category } from "@/libs/types";
import { Pencil, Tags, Trash } from "lucide-react";

interface Props {
  category: Category;
}

export default function CategoryItem({ category }: Props) {
  return (
    <div
      className="
        bg-[var(--color-bg-card)]
        border border-[var(--color-border)]
        rounded-xl
        p-1
        flex items-center justify-between
        hover:shadow-md
        transition-all
      "
    >
      <div className="flex items-center gap-3">
        <div className="w-15 h-15 rounded-md bg-(--color-bg-muted) flex items-center justify-center">
          <Tags className="w-5 h-5 text-(--color-primary)" />
        </div>

        <div>
          <p className="font-semibold">{category.name}</p>
          <span className="text-xs text-(--color-text-muted)">
            {/* ID: {category.id} */}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* EDIT */}
        <button className="p-2 rounded-md hover:bg-[var(--color-bg-muted)]">
          <Pencil className="w-4 h-4 text-blue-500" />
        </button>
        {/* DELETE */}
        <button className="p-2 rounded-md hover:bg-[var(--color-bg-muted)]">
          <Trash className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}
