import React from "react";

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
        <div>
          <label htmlFor=''>{label}</label>
          <input 
              type={type}
              id={name}
              name={name}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
              onBlur={onBlur} />
          {error && <p style={{color: 'red', fontSize: '.75rem'}}>{error}</p>}
        </div>
      
    )
  }
  