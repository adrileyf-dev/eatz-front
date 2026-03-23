"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductsTypes } from "@/types/ProductTypes";
import { useEffect, useState } from "react";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";

interface Category {
  id: string;
  name: string;
}

export default function ProductForm({ product }: { product?: ProductsTypes }) {
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
      <div>
        <Label>Nome</Label>
        <Input name="name" defaultValue={product?.name} />
      </div>

      <div>
        <Label>Preço</Label>
        <Input name="price" type="number" defaultValue={product?.price} />
      </div>

      <div>
        <Label>Categoria</Label>
        <select name="category_id" defaultValue={product?.category_id}>
          <option value="">Selecione</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Descrição</Label>
        <textarea name="description" defaultValue={product?.description} />
      </div>

      <div className="flex gap-2">
        <input
          type="checkbox"
          name="active"
          defaultChecked={product?.active ?? true}
        />
        <Label>Ativo</Label>
      </div>

      {product && <input type="hidden" name="id" value={product.id} />}
    </div>
  );
}
