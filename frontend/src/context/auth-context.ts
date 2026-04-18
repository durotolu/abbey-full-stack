import { createContext } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (t: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

export type { AuthContextType };
