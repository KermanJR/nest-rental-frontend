import React from "react";
import { Navigate } from "react-router-dom";
import { checkContext } from "../context/CheckoutContext";
import { UserContext } from "../context/UserContext";

export const ProtectedRoute = (props: any)=>{
    const { idPerfil, login } = React.useContext(UserContext)
    const { id_perfil } = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : 0

    debugger
    if(login) {
        return <Navigate to="/login"/>
       
    } else {
        if( id_perfil){ 
            return props.children 
        } else {
            return <Navigate to="/403"/>
        }
    }
}