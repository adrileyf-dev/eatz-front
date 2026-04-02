"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { Category } from "@/libs/types";
import { ProductsTypes } from "@/types/ProductTypes";
import { resizeImage } from "@/Utilits/resizeImage";

interface Props {
  product?: ProductsTypes;
}

export default function ProductForm({ product }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setPreview] = useState<string | null>(
    product?.banner || null,
  );
  const [imageFile, setFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    product?.category_id || "",
  );

  useEffect(() => {
    async function load() {
      const token = await getToken();
      const data = await apiClient<Category[]>("/categories", { token });
      setCategories(data);
      // Se estiver editando, garante que o valor seja setado quando as categorias carregarem
      if (product?.category_id) {
        setSelectedCategory(product.category_id);
      }
    }
    load();
  }, [product]);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Redimensiona para 600x600
    const resized = await resizeImage(file, 600, 600);
    setFile(resized);

    // Cria a prévia visual
    const previewUrl = URL.createObjectURL(resized);
    setPreview(previewUrl);

    // 🔥 TRUQUE MÁGICO: Coloca a imagem redimensionada de volta no input nativo do DOM
    // Isso garante que o FormData do componente pai pegue a imagem leve, e não a original!
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([resized], file.name, { type: file.type }));
    e.target.files = dataTransfer.files;
  }

  console.log("id categoria " + product?.category_id);
  const removeImage = () => {
    setPreview(null);
    setFile(null);

    // Limpa o input do DOM para não enviar a imagem acidentalmente
    const input = document.getElementById("file") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div>
      {/* NOME, PREÇO, CATEGORIA E DESCRIÇÃO (MANTIDOS IGUAIS) */}
      <div className="space-y-2 mb-4">
        <Label htmlFor="name">Nome do Produto</Label>
        <Input
          id="name"
          name="name"
          defaultValue={product?.name}
          placeholder="Ex: Pizza de Calabresa"
        />
      </div>

      <div className="space-y-2 mb-4">
        <Label htmlFor="price">Preço</Label>
        <Input
          id="price"
          name="price"
          type="text"
          inputMode="decimal"
          defaultValue={product?.price}
          placeholder="0,00"
        />
      </div>

      {/* CATEGORIA */}
      {/* CATEGORIA */}
      <div className="space-y-2 mb-4">
        <Label htmlFor="category">Categoria</Label>

        <select
          id="category"
          name="category_id"
          value={categoryId} // 🔥 Usa VALUE em vez de defaultValue
          onChange={(e) => setCategoryId(e.target.value)} // 🔥 Atualiza o estado ao mudar
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black"
        >
          <option value="" disabled>
            {categories.length === 0
              ? "Carregando..."
              : "Selecione uma categoria"}
          </option>

          {categories.map((category) => (
            // Convertendo para String por segurança, caso o ID venha como número
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2 mb-4">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Detalhes sobre o produto..."
          className="resize-none h-24"
          defaultValue={product?.description}
        />
      </div>

      {/* 🔥 IMAGEM REATORADA */}
      <div className="space-y-2 mb-4">
        <Label>Imagem do Produto</Label>

        {/* O input fica SEMPRE renderizado, porém escondido */}
        <Input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {imagePreview ? (
          <div className="relative group w-full h-56 border rounded-xl overflow-hidden bg-muted">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="text-taupe-50 font-bold absolute right-2 top-2 z-20"
              >
                <X className="w-4 h-4 text-taupe-50 mr-1" /> Remover Imagem
              </Button>
            </div>
            {/* Adicionamos uma label escondida para permitir trocar de imagem clicando nela */}
            <label
              htmlFor="file"
              className="absolute inset-0 cursor-pointer z-10"
            />
          </div>
        ) : (
          <label
            htmlFor="file"
            className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-muted-foreground/25 rounded-xl cursor-pointer hover:bg-accent/50 hover:border-primary/50 transition-all bg-white"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">
                  Clique para upload
                </span>{" "}
                ou arraste
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                PNG, JPG ou JPEG (Máx. 600x600px)
              </p>
            </div>
          </label>
        )}
      </div>

      {/* STATUS & ID */}
      <div className="flex items-center space-x-2 bg-white p-3 rounded-lg w-fit border border-input mb-4">
        <input
          type="checkbox"
          id="active"
          name="active"
          className="w-4 h-4 accent-primary"
          defaultChecked={product?.active ?? true}
        />
        <Label htmlFor="active" className="cursor-pointer">
          Produto Ativo para Vendas
        </Label>
      </div>

      {product && <input type="hidden" name="id" value={product.id} />}
    </div>
  );
}
