import { useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const setToken = (t: string | null) => {
    if (t) {
      localStorage.setItem("token", t);
    } else {
      localStorage.removeItem("token");
    }

    setTokenState(t);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
