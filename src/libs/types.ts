export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  createdAt: string;
}
export interface Category {
  id: string;
  name: string;
  createdAt: string;
}
