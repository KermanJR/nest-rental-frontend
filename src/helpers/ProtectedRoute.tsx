import React from "react";
import { Navigate } from "react-router-dom";
import { checkContext } from "../context/CheckoutContext";
import { UserContext } from "../context/UserContext";

export const ProtectedRoute = (props: any)=>{
    console.log("ProtectedRoute", props)
    const { idPerfil, login } = React.useContext(UserContext)
    debugger
    if(login) {
        return <Navigate to="/login"/>
       
    } else {
        if(idPerfil || true){ 
            return props.children 
        } else {
            return <Navigate to="/403"/>
        }
    }
}