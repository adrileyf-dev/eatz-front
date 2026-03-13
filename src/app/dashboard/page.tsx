import RegisterForm from "@/components/forms/register/registerForm";
import { authenticatedAdmin, getUserLog } from "@/libs/libsUtil";

export default async function Dashboard() {
  // se NÃO estiver logado → vai para login
  /* if (!user) {
    redirect("/login");
  }
*/
  return (
    <div>
      <h1>
        <RegisterForm />
      </h1>
    </div>
  );
}
