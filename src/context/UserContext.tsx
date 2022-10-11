import React, { useEffect } from 'react';
import { createContext, useState, FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { logar, TOKEN_POST, USER_GET } from 'src/api/api';

export type PropsUser = {
    login: boolean,
    emailUser: string
    passwordUser: string,
    levelUser: string
    idPerfil: number,
    userLogin: any,
    error: string,
    usuario: any /* Revisem!! */
}


export const UserContext = createContext<PropsUser>({
    login: null,
    emailUser: undefined,
    passwordUser: '',
    levelUser: '',
    idPerfil: 0,
    userLogin: () => ({}),
    error: '',
    usuario: null
})


export const UserStorage = ({ children }: any) => {

    const [emailUser, setEmailUser] = useState<string>(undefined);
    const [passwordUser, setPasswordUser] = useState<string>('');
    const [levelUser, setLevelUser] = useState<string>('');
    const [idPerfil, setIdPerfil] = useState(0);
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null)
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState();

    const { search } = useLocation();
    const redirect = new URLSearchParams(search).get("redirect");

    //Revisem, não os contextos não estão consistentes!
    async function carregar() {
        const token = window.localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            setUsuario(user);
            logar(token);
        }
    }


    const userLogin = async (emailUser: string, passwordUser: string) => {
        try {
            setError(null)
            setLoading(true)
            const { url, options } = TOKEN_POST(emailUser, passwordUser);
            const response = await fetch(url, options)
            const json = await response.json();
            if (json.message) {
                setError(json.message)
            } else {
                const { jwt: { token }, user } = await json;
                window.localStorage.setItem('token', token)
                window.localStorage.setItem('user', JSON.stringify(user))
                setUsuario(user)
                setLogin(true)
                if(user?.id_perfil === 2 || user?.id_perfil === 3){
                    navigate(redirect || '/dashboard/pedidos')
                }else if(user?.id_perfil === 1){
                    navigate(redirect || '/dashboard/geral')
                }
                
            }

        } catch (err) {
            setLogin(false)
        } finally {
            setLoading(false)
        }

    }


    useEffect(() => {
        carregar();
    }, []);



    return (
        <UserContext.Provider value={{
            userLogin,
            error,
            login,
            emailUser,
            passwordUser,
            idPerfil,
            levelUser,
            usuario
        }}>
            {children}
        </UserContext.Provider>
    )
}