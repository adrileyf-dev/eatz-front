import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_NAME = "EATZ_TOKEN";

export function middleware(request: NextRequest) {
  // Recupera o token dos cookies usando o mesmo nome do login
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  // Define as rotas que são restritas a usuários logados
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/orders");

  // Se o usuário NÃO está logado e tenta acessar uma rota protegida
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se o usuário JÁ está logado e tenta acessar a página de login
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configura em quais caminhos o middleware deve rodar
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/orders/:path*",
    "/login",
  ],
};
