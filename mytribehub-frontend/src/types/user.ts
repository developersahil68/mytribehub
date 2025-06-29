export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  updateUser: (userData: User) => void;
  clearUser: () => void;
  isLoading: boolean;
}
