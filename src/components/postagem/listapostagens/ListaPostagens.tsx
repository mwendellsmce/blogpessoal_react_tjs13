import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";

function ListaPostagens() {
    const navigate = useNavigate();
    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Redireciona para o login se o token estiver vazio
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [token, navigate]);

    // Busca as postagens ao renderizar o componente
    useEffect(() => {
        if (token !== '') {
            buscarPostagens();
        }
    }, [postagens.length, token]);

    async function buscarPostagens() {
        setIsLoading(true);
        try {
            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#312e81" size={32} />
                </div>
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    
                    {(!isLoading && postagens.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhuma postagem foi encontrada!
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {postagens.map((postagem) => (
                            <CardPostagem key={postagem.id} postagem={postagem} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaPostagens