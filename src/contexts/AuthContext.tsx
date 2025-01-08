import React, { createContext, useContext, useState } from "react";
import { User, UserRole } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  createUserCredentials: (userData: Partial<User>) => Promise<{ email: string; password: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  const createUserCredentials = async (userData: Partial<User>) => {
    if (!userData.email) {
      throw new Error("Email is required");
    }

    const password = generatePassword();
    
    // Here you would typically make an API call to create the user
    // For now, we'll just return the credentials
    return {
      email: userData.email,
      password: password
    };
  };

  const login = async (email: string, password: string) => {
    try {
      // Mock login - replace with actual authentication logic
      const mockUser: User = {
        id: "1",
        name: "User",
        email: email,
        role: "buyer" as UserRole,
        status: "active",
        createdBy: "admin-1" // This would come from the backend
      };
      
      setUser(mockUser);
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Credenciais inválidas",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        createUserCredentials
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};