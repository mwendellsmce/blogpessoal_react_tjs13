import axios from "axios";

// cria uma nova isntancia do Axios
const api = axios.create({
    baseURL: 'https://blogpessoal-tsj13.onrender.com'
})

// funcao para cadastrar usuario
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}
// funcao para autenticar usuario
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)    
}    