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

export interface UserAll {
  userId: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  isActive: boolean;
  phone: string;
}