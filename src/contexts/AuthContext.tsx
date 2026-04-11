import { createContext, useState, type ReactNode } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { ToastAlert } from "../utils/ToastAlert"

interface AuthContextProps{
  usuario: UsuarioLogin
  handleLogout(): void
  handleLogin(usuario: UsuarioLogin): Promise<void>
  isLoading: boolean
}

interface AuthProviderProps{
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps){
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: ""
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleLogin(usuarioLogin: UsuarioLogin){
    setIsLoading(true)

    try{
        await login('/usuarios/logar', usuarioLogin, setUsuario)
        ToastAlert('Usuário autenticado com sucesso!', 'sucesso')
    }catch(error){
        ToastAlert('Os dados do Usuário estão inconsistentes!', 'erro')
    }

    setIsLoading(false)
  }

  function handleLogout(){
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: ""
    })
  }

  return(
    <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}