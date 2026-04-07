"use server";

import OrderPage from "../OrdersPage/page";

export default async function Dashboard() {
  // se NÃO estiver logado → vai para login
  /* if (!user) {
    redirect("/login");
  }
*/

  return <OrderPage />;
}
