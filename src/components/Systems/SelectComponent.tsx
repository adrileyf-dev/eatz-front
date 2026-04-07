import { Label } from "@/components/ui/label"; // Ajuste o caminho conforme seu projeto
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Definimos o formato esperado para as opções do select
export interface SelectOption {
  id: string | number;
  name: string;
}

interface CustomSelectProps {
  label: string;
  name?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export function CustomSelect({
  label,
  name,
  value,
  onValueChange,
  options,
  placeholder = "Selecione uma opção", // Texto padrão caso não seja passado
}: CustomSelectProps) {
  // Cria um ID único para vincular a Label ao Select, baseado no nome ou label
  const selectId = name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-2 mb-2">
      <Label htmlFor={selectId}>{label}</Label>

      <Select name={name} value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={selectId}
          className="w-full bg-white border border-input text-black"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="bg-white border border-input text-black">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id.toString()} // Radix/Shadcn exige que o value seja string
              >
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
