import axios from 'axios';

let token = null;

export const api = axios.create({
    baseURL: 'http://localhost:4003/api'
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

