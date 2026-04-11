import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SyncLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { ToastAlert } from "../../../utils/ToastAlert"

function FormTema() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' })

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarTemaPorId() {
        try {
            setIsLoading(true)
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token },
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                ToastAlert('O token expirou, favor logar novamente', 'info')
                handleLogout()
                navigate('/login')
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlert('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId()
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })
    }

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token },
                })
                ToastAlert('Tema atualizado com sucesso', 'sucesso')
                retornar()
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    ToastAlert('O token expirou, favor logar novamente', 'info')
                    handleLogout()
                    navigate('/login')
                } else {
                    ToastAlert('Erro ao atualizar o Tema', 'erro')
                }
            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token },
                })
                ToastAlert('Tema cadastrado com sucesso', 'sucesso')
                retornar()
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    ToastAlert('O token expirou, favor logar novamente', 'info')
                    handleLogout()
                    navigate('/login')
                } else {
                    ToastAlert('Erro ao cadastrar o Tema', 'erro')
                }
            }
        }

        setIsLoading(false)
    }

    function retornar() {
        navigate("/temas")
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-blue-500 hover:bg-blue-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit"
                >
                    {isLoading ? (
                        <SyncLoader color="#ffffff" size={8} />
                    ) : (
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    )}
                </button>
            </form>
        </div>
    )
}

export default FormTema