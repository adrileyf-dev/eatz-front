import { authenticatedAdmin, getUserLog } from "@/libs/libsUtil";

export default async function Dashboard() {
  const user = await authenticatedAdmin();

  // se NÃO estiver logado → vai para login
  /* if (!user) {
    redirect("/login");
  }
*/
  return (
    <div>
      {user?.name}
      <h1>Teste de Desenvolvimento de sistemas</h1>
    </div>
  );
}
