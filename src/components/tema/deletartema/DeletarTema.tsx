import { useContext, useEffect, useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SyncLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlert } from "../../../utils/ToastAlert"

function DeletarTema() {
    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            setIsLoading(true) 
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
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
            buscarPorId(id)
        }
    }, [id])

    async function deletarTema(e: SyntheticEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: { Authorization: token }
            })
            ToastAlert('Tema apagado com sucesso', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('401')) { 
                ToastAlert('O token expirou, favor logar novamente', 'info')
                handleLogout()
                navigate('/login')
            } else {
                ToastAlert('Erro ao apagar o tema.', 'erro') 
            }
        }
        
        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-blue-900 text-white font-bold text-2xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-blue-500 hover:bg-blue-800 flex items-center justify-center'
                        onClick={(e: SyntheticEvent) => deletarTema(e)}
                    >
                        {isLoading ? (
                            <SyncLoader color="#ffffff" size={8} />
                        ) : (
                            <span>Sim</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema