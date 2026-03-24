"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductsTypes } from "@/types/ProductTypes";
import { useEffect, useState } from "react";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
}

interface Props {
  product?: ProductsTypes;
}

export default function ProductForm({ product }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function load() {
      const token = await getToken();
      const data = await apiClient<Category[]>("/categories", { token });
      setCategories(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-4">
      {/* NOME */}
      <div>
        <Label className="mb-2">Nome</Label>
        <Input name="name" defaultValue={product?.name} />
      </div>

      {/* PREÇO */}
      <div>
        <Label className="mb-2">Preço</Label>
        <Input name="price" type="number" defaultValue={product?.price} />
      </div>

      {/* CATEGORIA */}
      <div>
        <Label className="mb-2">Categoria</Label>

        <Select name="category_id" defaultValue={product?.category_id}>
          <SelectTrigger className="bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text)]">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>

          <SelectContent className="bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text)]">
            <SelectGroup>
              {categories.map((c) => (
                <SelectItem
                  key={c.id}
                  value={c.id}
                  className="text-[var(--color-text)]"
                >
                  {c.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* DESCRIÇÃO */}
      <div>
        <Label className="mb-2">Descrição</Label>
        <Textarea
          name="description"
          className="md"
          defaultValue={product?.description}
        />
      </div>

      {/* 🔥 IMAGEM */}
      <div>
        <Label className="mb-2">Imagem</Label>
        <Input className="flex gap-2" type="file" name="file" />
      </div>

      {/* STATUS */}
      <div className="flex gap-2">
        <input
          type="checkbox"
          name="active"
          defaultChecked={product?.active ?? true}
        />
        <Label>Ativo</Label>
      </div>

      {/* ID (edit) */}
      {product && <input type="hidden" name="id" value={product.id} />}
    </div>
  );
}
