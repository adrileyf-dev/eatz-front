import { getUserLog } from "@/libs/libsUtil";
import LoginForm from "../../components/forms/login/LoginForm";

export default async function Login() {
  const user = await getUserLog();

  return (
    <div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
