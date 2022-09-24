import { useState } from 'react';
import { cnpj } from 'cpf-cnpj-validator';



export const useForm = (type: any) =>{

    const [error, setError] = useState(''); 
    const [value, setValue] = useState('');

    const types: any = {
        email:{
            regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Preencha um email válido'
        },
        password:{
            regex: /^(?=.*\d).{4,8}$/,
            message: 'A senha deve ter 1 caractere maiúsculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.'
    
        },
        number:{
            regex: /^\d+$/,
            message: 'Utilize apenas números'
        },
        cnpj:{
            regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
            message: 'Preencha um CNPJ válido.'
        },
        insc_estadual:{
            regex: /^\d{2}\.\d{3}\.\d{3}\-\d{1}$/,
            message: 'Preencha uma inscrição válida.'
        }
    }

    const validate = (value: any) =>{
        if(type === false){
            return true
        }
        if(value.lenght === 0){
            setError('Preencha um valor.')
            return false
        }else if(types[type] && !types[type].regex.test(value)){
            setError(types[type].message)
            return false
        }else{
            setError('')
            return true
        }
    }

   
    const onChange = ({target}:any) =>{
        let newCnpj = '';
        let newInscEst = '';
        if(type === 'cnpj'){
            const cnpjOld = target.value;
            newCnpj = cnpj.format(cnpjOld);
        }
        if(type === 'insc_estadual'){
            const inscEst = target.value;
            // newInscEst = maskBr.inscricaoestadual('MS', inscEst)
        }
       
        if(error) validate(target.value)
        if(type === 'cnpj'){
            setValue(newCnpj)
        }else{
            setValue(target.value)
        }
    }   
    


    return {
        value,
        setValue,
        onChange,
        error,
        validate: ()=>validate(value),
        onBlur: ()=>validate(value),
    }
}