import { useContext, useEffect, useState } from 'react'
import { SyncLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import type Tema from '../../../models/Tema'
import { buscar } from '../../../services/Service'
import CardTema from '../cardtema/CardTema'

function ListaTemas() {
    const [temas, setTemas] = useState<Tema[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // useEffect para monitorar o token e proteger a rota
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/') // Redireciona para a raiz (Login)
        }
    }, [token])

    // useEffect para inicializar a busca de temas
    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    async function buscarTemas() {
        setIsLoading(true)
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token },
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                // Apenas desloga. O useEffect acima detectará a mudança do token e fará o navigate.
                handleLogout() 
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Bloco 01: Loader centralizado enquanto busca dados */}
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#312e81" size={32} />
                </div>
            )}

            {/* Adicionado o px-4 para responsividade */}
            <div className="flex justify-center w-full px-4 my-4">
                <div className="container flex flex-col">
                    
                    {/* Bloco 02: Mensagem caso a lista retorne vazia após o carregamento */}
                    {(!isLoading && temas.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temas.map((tema) => (
                            <CardTema key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaTemas