import { USER_STORAGE } from "constants";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState } from "react";

// Định nghĩa kiểu dữ liệu cho user
export interface User {
  id: string;
  username: string;
}

// Kiểu context
interface UserContextType {
  user: User | null;
  token: string | null;
  setUserData: (token: string | null) => void;
  logout: () => void;
}

// Tạo context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setUserData = (token: string | null) => {
    if (token) {
      const userData: User = jwtDecode(token);
      if (userData.id) {
        setUser(userData);
        setToken(token);
        localStorage.setItem(USER_STORAGE, token);
      }
    } else {
      localStorage.removeItem(USER_STORAGE);

      logout();
    }
  };

  const logout = () => {
    setUserData(null);
  };

  // useEffect(() => {
  //   const storedToken = localStorage.getItem(USER_STORAGE);
  //   if (storedToken) {
  //     const userData: User = jwtDecode(storedToken);
  //     if (userData.id) {
  //       setUser(userData);
  //       setToken(storedToken);
  //     }
  //   }
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUserData, token, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook tiện dụng để dùng
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
