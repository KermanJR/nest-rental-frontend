
async function SearchCep(cep: any) {
    try {
        const url_fetch = fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET',
        })
        const response = await url_fetch;
        return await response.json();
    } catch (err) {
       return err;
    }
}

export default SearchCep;
