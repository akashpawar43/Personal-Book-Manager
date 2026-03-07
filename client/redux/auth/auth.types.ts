export interface User {
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}