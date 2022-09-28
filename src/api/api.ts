import axios from 'axios';

let token = null;

export const api = axios.create({
    baseURL: 'https://nest-rental-backend.herokuapp.com/api'
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
}

