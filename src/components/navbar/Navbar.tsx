import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Navbar() {
    // Objeto responsável por redirecionar o usuário
    const navigate = useNavigate()

    // Consumo do contexto
    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        alert('O usuário foi desconectado com sucesso!')
        navigate('/')
    }

    // Se o token estiver vazio (usuário não logado), a Navbar não é renderizada na tela
    if (usuario.token === "") {
        return <></>
    }

    return (
        <div className='w-full flex justify-center py-4 bg-blue-900 text-white'>
            <div className="container flex justify-between text-lg mx-8 items-center">
                
                <Link to="/home" className="text-2xl font-bold uppercase">
                    Blog Pessoal
                </Link>

                <div className='flex gap-4'>
                    <Link to='/postagens' className='hover:underline'>Postagens</Link>
                    <Link to='/temas' className='hover:underline'>Temas</Link>
                    <Link to='/cadastrarTema' className='hover:underline'>Cadastrar tema</Link>
                    <div className='hover:underline cursor-pointer'>Perfil</div>
                    <Link to='' onClick={logout} className='hover:underline'>
                        Sair
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar