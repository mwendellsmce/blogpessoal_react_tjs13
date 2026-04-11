import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlert } from "../../utils/ToastAlert"

function Navbar() {
    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        ToastAlert('O usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }

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
                    <Link to='/perfil' className='hover:underline cursor-pointer'>Perfil</Link>
                    <Link to='' onClick={logout} className='hover:underline'>
                        Sair
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar