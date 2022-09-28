import React from 'react';
import { createContext, useState, FC } from 'react';
import { useNavigate } from 'react-router';
import { TOKEN_POST, USER_GET } from 'src/api/api';

export type PropsUser = {
    login: boolean,
    emailUser: string
    passwordUser: string,
    levelUser: string
    userLogin: any,
    error: string
}


export const UserContext = createContext<PropsUser>({
    login: null,
    emailUser: undefined,
    passwordUser: '',
    levelUser: '',
    userLogin: ()=> ({}),
    error:''

})


export const UserStorage = ({children}: any)=>{

    const [emailUser, setEmailUser] = useState<string>(undefined);
    const [passwordUser, setPasswordUser] = useState<string>('');
    const [levelUser, setLevelUser] = useState<string>('');
    
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null)
    const navigate = useNavigate()


    {/*const getUser = async (token: string) =>{
        const { url, options } = USER_GET(token)
        const response = await fetch(url, options)
        const json = await response.json()
        setData(json)
        setLogin(true)
    } */}   


    const userLogin = async(emailUser: string, passwordUser: string) =>{
        try{
            setError(null)
            setLoading(true)
            const { url, options } = TOKEN_POST(emailUser, passwordUser);
            const tokenRes = await fetch(url, options)
            const json = await tokenRes.json();
    
            if(json.message){
                setError(json.message)
            }else{
                const {token} = await json;
                console.log(token)
                window.localStorage.setItem('token', token)
                setEmailUser(emailUser)            
                navigate('/dashboard/geral')
            }
            
        }catch(err){
            setLogin(false)
        }finally{
            setLoading(false)
        }
        
    }




    return (
        <UserContext.Provider value={{
            userLogin,
            error,
            login,
            emailUser,
            passwordUser,
            levelUser
        }}>
            {children}
        </UserContext.Provider>
    )
}