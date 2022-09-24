import React from "react";
import styles from './MessageError.module.scss'

interface Props{
    message: Array<String>;
}

export const MessageError = ({message}: Props) =>{
    return (
        <div className={styles.divMessage}>
            {message.map(item=>(
                <p className={styles.divMessage__message} key=''>{item}</p>
            ))}
        </div>

    );
}