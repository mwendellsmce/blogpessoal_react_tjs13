import axios from "axios";

// cria uma nova instancia do Axios
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

// funcao para consultar com token 
export const buscar = async (url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header)
  setDados(resposta.data)
}

// funcao para cadastrar com token
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header)
  setDados(resposta.data)
}

// funcao para atualizar com token
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header)
  setDados(resposta.data)
}

// funcao para deletar com token (Corrigido: dados substituído por header)
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}