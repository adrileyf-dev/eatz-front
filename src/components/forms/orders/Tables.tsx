"use client";

interface TableProps {
  mesa: string | number; // Aceita tanto "01" quanto 1
  sta: boolean;
}

export default function Tables({ mesa, sta }: TableProps) {
  return (
    <div className="flex justify-between items-start p-4 border-b border-gray-100">
      <label className="font-bold text-lg uppercase tracking-wider text-slate-800">
        Mesa {mesa}
      </label>

      <span
        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
          sta ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {sta ? "Concluído" : "Aberto"}
      </span>
    </div>
  );
}
