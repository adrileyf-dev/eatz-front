export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  createdAt: string;
}
export interface categorie {
  id: string;
  name: string;
  createdAt: string;
}
