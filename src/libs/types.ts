export interface User {
  id: string;
  name: string;
  eamil: string;
  role: "ADMIN" | "STAFF";
  createdAt: string;
}
