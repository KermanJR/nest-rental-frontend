import React from "react";

type Props = {
    children: React.ReactNode;
}

export const Title  = (props: any) =>{
    const {text, level, children} = props;
    return(
        <h1 style={{
            color: 'rgba(18, 80, 130)',
            fontSize: '1.2rem',
            marginTop: '0',
            paddingBottom:".5rem"  

        }}> 
            {children}
        </h1>
    )
}