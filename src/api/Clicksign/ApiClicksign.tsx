const API_URL_CLICKSIGN = 'https://nest-rental-backend-api.herokuapp.com/'
const API_URL_DEV_CLICKSIGN = 'http://localhost:6800/'


//Cria documento de contrato
export function CREATE_DOCUMENT(body: any){
    return{
        url: API_URL_CLICKSIGN + 'create-model',
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}


//Cria signatário do documento
export function CREATE_DOCUMENT_SIGNER(body: any){
    return{
        url: API_URL_CLICKSIGN + 'create-signer',
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}

//Relaciona signatário ao documento
export function JOIN_DOCUMENT_SIGNER(body: any){
    return{
        url: API_URL_CLICKSIGN + 'create-document',
        options: {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    }
}


