import React, { createContext, useContext, useEffect, useState } from "react";
import { Usuario } from "../models/Usuario";
import api from "../services/api";
import jwt_decode from "jwt-decode";
import { CircularProgress } from "@mui/material";

interface AuthProviderProps {
  isLogado: boolean;
  usuario: Usuario | null;
  login(email: string, senha: string): Promise<Usuario>;
  logout(): void;
}

const AuthContext = createContext<AuthProviderProps>({} as AuthProviderProps);

export const AuthProvider: React.FC = ({ children }) => {
  function setApiAuthToken(token: string) {
    if (token === "") {
      api.defaults.headers.common["Authorization"] = "";
    } else {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storageUsuario = sessionStorage.getItem("@App:usuario");
    const storageToken = sessionStorage.getItem("@App:token");

    if (storageToken && storageUsuario) {
      setUsuario(JSON.parse(storageUsuario));
      setApiAuthToken(storageToken);
    }
    setLoading(false);
  }, []);

  async function login(email: string, senha: string) {
    try {
      const response = await api.post("/auth/login", { email, senha });

      const token = response.data.access_token;
      const usuario: Usuario = jwt_decode(token) as Usuario;

      setUsuario(usuario);
      setApiAuthToken(token);

      sessionStorage.setItem("@App:usuario", JSON.stringify(usuario));
      sessionStorage.setItem("@App:token", token);
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    setUsuario(null);
    sessionStorage.removeItem("@App:usuario");
    sessionStorage.removeItem("@App:token");
    setApiAuthToken("");
  }

  return (
    <AuthContext.Provider
      value={{ isLogado: !!usuario, login, logout, usuario }}
    >
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#2c3e50",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
