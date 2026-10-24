import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user);
        
      } catch (error) {
        console.error("Failed to restore user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [API_URL]);

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

