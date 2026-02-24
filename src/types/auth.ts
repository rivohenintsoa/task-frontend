export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  data: {
    user: User;
    token: string;
  };
}