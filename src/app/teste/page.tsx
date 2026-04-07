"use client";

import { useEffect } from "react"; // 1. Importar useEffect
import { io } from "socket.io-client";

export default function Sidebar() {
  const menuItems = [
    { label: "HOME", icon: "Xy10Jcu1L2Su" },
    { label: "Cadastro", icon: "118497" },
    { label: "Categoria", icon: "16713" },
  ];

  useEffect(() => {
    // 2. Conectar apenas uma vez quando o componente montar
    const socket = io("http://localhost:3333");

    console.log("Tentando conectar ao Socket.IO...");

    // 3. Ouvir os tópicos que o seu Kafka Consumer está enviando
    socket.on("order.created", (data) => {
      console.log("Novo pedido via Kafka:", data);
      // Aqui você pode disparar um som ou um alerta na tela
      alert(`Novo pedido na mesa ${data}!`);
    });

    socket.on("order.completed", (data) => {
      console.log("Pedido finalizado:", data);
    });

    // 4. LIMPEZA: Desconectar quando o usuário sair da página
    return () => {
      socket.disconnect();
    };
  }, []); // Array vazio garante que só rode uma vez

  return (
    <aside className="bg-slate-800 w-20 lg:w-72 min-h-screen border-r border-slate-700 flex flex-col items-center">
      {/* ... seu código de estilo continua igual ... */}
      <div className="flex w-full justify-center items-center lg:py-16">
        <span className="text-slate-200 text-2xl font-extrabold hidden lg:block">
          EATZ
        </span>
      </div>

      <label>Teste de execução </label>
    </aside>
  );
}
