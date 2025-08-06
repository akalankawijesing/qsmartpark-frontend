export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  role: string;
  passwordHash: string;
  email: string;
  isActive: boolean;
  phone: string;
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}