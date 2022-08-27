export const API_URL_ZOHO = 'http://localhost:6700/'

//Retorna token de autorização para fazer requisições Zoho
export function TOKEN_POST(){
    return{
        url: API_URL_ZOHO + 'generate-token',
        options:{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
        }
    }
}


