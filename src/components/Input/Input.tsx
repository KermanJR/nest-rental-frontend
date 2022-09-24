import React from "react";
import styles from './Input.module.scss';

interface InputProps{
    label: string;
    type: string;
    name: string;
    id: string;
    value: any;
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    error: string;
    onBlur: React.ChangeEventHandler<HTMLInputElement>;
}


export const Input = ({label, type, name, value, placeholder, onChange, error, onBlur}: InputProps) => {
    return (
        <div style={{display: 'block', width: '100%', padding: ".5rem 0"}}>
          <label htmlFor={name}>{label}</label>
          <input className={styles.input}
              type={type}
              id={name}
              name={name}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
              onBlur={onBlur}
              style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}} 
            />
          {error && <p style={{color: 'red', fontSize: '.75rem'}}>{error}</p>}
        </div>
      
    )
  }
  