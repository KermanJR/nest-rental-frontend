import axios from 'axios';
export const API_URL = 'https://nest-rental-backend.herokuapp.com/api'

let token = null;

export const api = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    console.log(config);

    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`
    }

    return config;
});

export function logar(jwtToken: string) {
    token = jwtToken;
    console.log(token)
}

//Retorna o usuário pelo token
export function USER_GET(token: string){
    return{
        url: API_URL + '/usuarios/login',
        options: {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            
        }
    }
}

//Retorna o token do usuário
export function TOKEN_POST(user_email: string, user_password: string){
    return{
        url: API_URL + '/usuarios/login',
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: user_email,
                password: user_password
            })
        }
    }
}

