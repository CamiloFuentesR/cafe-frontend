import axios from "axios";


export const clienteAxios = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
    
})
export const token = () => {
    
    return localStorage.getItem('token') ||'';
}

export const clienteAxiosToken = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
        'x-token': token(),
    }
    
})
