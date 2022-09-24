import React from "react";
import { Navigate } from "react-router-dom";
import { checkContext } from "../context/CheckoutContext";


export const ProtectedRoute = ({children}: any)=>{

    const {login} = React.useContext(checkContext);

    return login? <Navigate to="/login"/>: children
}