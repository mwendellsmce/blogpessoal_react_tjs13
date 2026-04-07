import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; 
import type UsuarioLogin from '../../models/UsuarioLogin'; 
import { ClipLoader } from 'react-spinners';

function Login() {
  
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== '') {
      navigate('/home');
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  // Função disparada ao submeter o formulário
  function login(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] items-center">
      
      <div className="flex flex-col justify-center items-center p-8">
        <h2 className="text-4xl font-bold mb-8">Entrar</h2>

        {/* Adicionado o onSubmit */}
        <form className="flex flex-col w-full max-w-md gap-4" onSubmit={login}>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="border border-slate-400 rounded p-2"
              value={usuarioLogin.usuario || ''}
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
              value={usuarioLogin.senha || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          {/* Adicionado o tipo submit e o ClipLoader para manter a padronização */}
          <button 
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold rounded py-2 mt-4 flex justify-center items-center"
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Entrar</span>}
          </button>

          <hr className="border-slate-300 w-full mt-4" />

          <p className="mt-4">
            Ainda não tem uma conta?{' '}
            <Link to="/cadastro" className="text-blue-900 font-bold hover:underline">
              Cadastre-se
            </Link>
          </p>

        </form>
      </div>

      <div className="hidden md:block">
        <img
          src="https://i.imgur.com/fyfri1v.png"
          alt="Imagem de Login"
          className="w-full h-full object-cover"
        />
      </div>
      
    </div>
  );
}

export default Login;