"use client";

import Image from "next/image";
import { ReactNode } from "react";

// ============================
// 🎨 NOVA PALETA (PROFISSIONAL)
// ============================
// Sidebar: slate-800 (escuro elegante)
// Background: slate-50 (clean)
// Primary: indigo-600 (ação / destaque)
// Text: slate-200 / slate-800 (contraste ideal)

// ============================
// Sidebar Component
// ============================
function Sidebar() {
  const menuItems = [
    { label: "HOME", icon: "Xy10Jcu1L2Su" },
    { label: "Cadastro", icon: "118497" },
    { label: "Categoria", icon: "16713" },
  ];

  return (
    <aside className="bg-slate-800 w-20 lg:w-72 min-h-screen border-r border-slate-700 flex flex-col items-center">
      {/* Logo */}
      <div className="flex w-full justify-center items-center lg:py-16">
        <span className="text-slate-200 text-2xl font-extrabold hidden lg:block">
          EATZ
        </span>
      </div>

      {/* Mobile Menu */}
      <nav className="flex flex-col gap-6 mt-20 lg:hidden">
        {menuItems.map((item) => (
          <img
            key={item.label}
            src={`https://img.icons8.com/?size=100&id=${item.icon}&format=png&color=ffffff`}
            className="w-6 h-6 object-contain opacity-80 hover:opacity-100"
            alt={item.label}
          />
        ))}
      </nav>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex flex-col w-full mt-10 px-6">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className="flex items-center gap-2 border-b border-slate-700 pb-3 mb-6 font-medium text-slate-300 hover:text-indigo-400 transition-colors"
          >
            <img
              src={`https://img.icons8.com/?size=100&id=${item.icon}&format=png&color=ffffff`}
              className="w-6 h-6 object-center opacity-80"
              alt={item.label}
            />
            {item.label}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <p className="hidden lg:block text-center font-medium text-sm text-slate-400 mt-auto mb-6">
        Dev 360 2026
      </p>
    </aside>
  );
}

// ============================
// Profile Component
// ============================
function Profile() {
  return (
    <section className="bg-slate-50 flex-grow min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <Image
            src="/im.png"
            alt="Minha imagem"
            width={320}
            height={320}
            className="rounded-2xl shadow-md h-40 md:h-64 lg:h-80 w-auto"
          />
        </div>

        {/* Text */}
        <div className="md:col-span-2 text-center md:text-left">
          <h1 className="text-4xl text-slate-800 font-bold">
            Adriley Francisco Almeida Pereira
          </h1>

          <p className="text-xl text-slate-600 font-medium mt-2">
            Analista de Sistemas e Programador
          </p>

          {/* CTA exemplo (padrão dashboard) */}
          <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Ver Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================
// Main Page
// ============================
export default function Sobre() {
  return (
    <main className="flex">
      <Box title="Develper">
        <p>Validacao de sistemas </p>
      </Box>
    </main>
  );
}

interface Props {
  title: string;
  children?: ReactNode;
}

function Box({ title, children }: Props) {
  return (
    <>
      <div className="border p-4 rounded-lg">
        <h2 className="font-bold">{title}</h2>

        <div className="mt-2 border-t pt-2">{children}</div>
      </div>
    </>
  );
}
