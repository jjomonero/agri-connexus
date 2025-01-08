export type UserRole = "supplier" | "buyer" | "administrator";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdBy?: string; // ID of the admin who created this user
  password?: string; // Only used during creation
  status: "active" | "inactive";
}

export interface UserCredentials {
  email: string;
  password: string;
}