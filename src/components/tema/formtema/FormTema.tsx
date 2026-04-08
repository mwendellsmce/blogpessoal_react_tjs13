import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"

function FormTema() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // Mantivemos a SUA inicialização segura do estado
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Atualizado com o padrão de loader e erro 401 do professor
    async function buscarTemaPorId() {
        try {
            setIsLoading(true);
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                alert('O token expirou, favor logar novamente');
                handleLogout();
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarTemaPorId();
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        });
    }

    async function gerarNovoTema(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token },
                });
                alert('Tema atualizado com sucesso');
                retornar();
            } catch (error: any) {
                if (error.toString().includes('401')) { // Atualizado para 401
                    alert('O token expirou, favor logar novamente');
                    handleLogout();
                    navigate('/login');
                } else {
                    alert('Erro ao atualizar o Tema');
                }
            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token },
                });
                alert('Tema cadastrado com sucesso');
                retornar();
            } catch (error: any) {
                if (error.toString().includes('401')) { // Atualizado para 401
                    alert('O token expirou, favor logar novamente');
                    handleLogout();
                    navigate('/login');
                } else {
                    alert('Erro ao cadastrar o Tema');
                }
            }
        }

        setIsLoading(false);
    }

    function retornar() {
        navigate("/temas");
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
                    className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit"
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={24} />
                    ) : (
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormTema;