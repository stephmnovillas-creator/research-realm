export interface User {
  id: number;
  firstName: string;
  lastName: string;
  lrn: string;
  email: string;
  role: "ADMIN" | "STUDENT";
}
