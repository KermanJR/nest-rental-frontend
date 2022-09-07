import React from "react";

export const useFetch = () =>{
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState<Boolean>(false);
    const [error, setError] = React.useState(null);

    const request = React.useCallback(async(url: any, options: any)=>{
        let response;
        let json;
        let key;
        try{
            setError(null)
            setLoading(true)
            response = await fetch(url, options)
            json = await response.json()
            key = await json.data;
            if(response.ok === false) throw new Error(json.message)
        }catch(err: any){
            json = null
            setError(err.message)
        }finally{
            setData(json?.data)
            setLoading(false)
            return {response, key}
        }
    },[])

    return {
        data,
        loading,
        error,
        request
    }


}