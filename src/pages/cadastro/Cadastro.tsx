import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { SyncLoader } from "react-spinners"
import type Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/Service"
import { ToastAlert } from "../../utils/ToastAlert"

function Cadastro() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmarSenha, setConfirmarSenha] = useState<string>('')
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }

  function retornar() {
    navigate('/login')
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true)
      try {
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario)
        ToastAlert('Usuário cadastrado com sucesso!', 'sucesso')
      } catch (error) {
        ToastAlert('Erro ao cadastrar usuário', 'erro')
      }
    } else {
      ToastAlert('Dados do usuário inconsistentes! Verifique a senha.', 'erro')
      setUsuario({
        ...usuario,
        senha: ''
      })
      setConfirmarSenha('')
    }
    setIsLoading(false)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
      <div className="hidden md:block">
        <img
          src="https://i.imgur.com/fyfri1v.png"
          alt="Imagem de Cadastro"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-center p-8">
        <h2 className="text-4xl font-bold mb-8">Cadastrar</h2>

        <form className="flex flex-col w-full max-w-md gap-4" onSubmit={cadastrarNovoUsuario}>
          <div className="flex flex-col gap-1">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border border-slate-400 rounded p-2"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border border-slate-400 rounded p-2"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border border-slate-400 rounded p-2"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border border-slate-400 rounded p-2"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border border-slate-400 rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>

          <div className="flex justify-around mt-4 gap-4">
            <button
              type="button"
              className="bg-red-400 hover:bg-red-500 text-white rounded py-2 w-1/2"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold rounded py-2 w-1/2 flex justify-center items-center"
            >
              {
                isLoading ?
                  <SyncLoader color="white" size={8} />
                :
                  <span>Cadastrar</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cadastro