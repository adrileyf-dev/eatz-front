import { getToken } from "@/libs/getCookies";
import { GeralState } from "@/libs/typeState";

export async function ServiceOrder(
  prevState: GeralState | null,
  formData: FormData,
) {
  try {
    const token = await getToken();
  } catch (error) {}
}
