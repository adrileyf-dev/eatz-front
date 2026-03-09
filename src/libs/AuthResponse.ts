export default interface AuthRespose {
  id: string;
  name: string;
  email: string;
  role: "STAFF" | "ADMIN";
  token: string;
}
