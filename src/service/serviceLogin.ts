import { RegisterState } from "@/libs/RegisterState";

export async function ServiceLogin(
  prevState: RegisterState | null,
  formData: FormData,
) {
  return {
    success: true,
    message: "Registro realizado com sucesso",
  };
}
