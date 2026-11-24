import { createContext, useContext, useState } from "react";
import { USUARIOS_MOCK } from "../data/usuariosMock";

export const AuthContext = createContext(null);

const STORAGE_KEY = "academiq_usuario";

function cargarUsuarioInicial() {
  const guardado = sessionStorage.getItem(STORAGE_KEY);
  if (!guardado) {
    return null;
  }

  try {
    return JSON.parse(guardado);
  } catch (error) {
    console.error("No se pudo recuperar la sesión:", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(cargarUsuarioInicial);

  const iniciarSesion = (correo, clave) => {
    const correoNormalizado = String(correo || "").trim().toLowerCase();
    const encontrado = USUARIOS_MOCK.find(
      (u) => u.correo.toLowerCase() === correoNormalizado && u.clave === clave
    );

    if (!encontrado) {
      return {
        ok: false,
        error: "Credenciales inválidas. Verifica tu correo y contraseña."
      };
    }

    const usuarioPublico = {
      id: encontrado.id,
      nombre: encontrado.nombre,
      correo: encontrado.correo,
      rol: encontrado.rol,
      programa: encontrado.programa,
      codigo: encontrado.codigo,
      semestre: encontrado.semestre
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioPublico));
    setUsuario(usuarioPublico);

    return { ok: true, usuario: usuarioPublico };
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        autenticado: Boolean(usuario)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
  }
  return context;
}

export default AuthProvider;
