import { getUserLog } from "@/libs/libsUtil";
import LoginForm from "../../components/forms/login/LoginForm";

export default async function Login() {
  const user = await getUserLog();

  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
}
