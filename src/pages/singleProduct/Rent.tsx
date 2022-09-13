import React, { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageError } from '../../components/MessageError/MessageError';
import styles from './Rent.module.scss';
import { useContext } from 'react';
import { checkContext } from '../../context/CheckoutContext';



const Rent = () => {

    const [addDays, setAddDays] = React.useState<number>(0)
    const [log, setLog] = React.useState('');
    const [errorCep, setErrorCep] = React.useState('');
    const [error, setError] = React.useState(['']);

    const navigate = useNavigate();

    const {
        cep,
        setCep,
        price,
        billing,
        setBilling,
        totalDays,
        setTotalDays,
        newPrice,
        setNewPrice,
        startDate,
        endDate,
        setEndDate,
        setStartDate,
        setBairro,
        setContact,
        setStreet,
        setState,
        setCountry
    } = useContext(checkContext);

 




    /*function adicionaDias(){
        if(addDays && addDays === 1){
            setNewPrice(price + 137)
        }
        if(addDays && addDays === 2){
            setNewPrice(price + 149)
        }
        if(addDays && addDays === 3){
            setNewPrice(price + 164)
        }
        if(addDays && addDays === 4){
            setNewPrice(price + 317)
        }
        if(addDays && addDays === 5){
            setNewPrice(price + 458)
        }
        if(addDays && addDays === 6){
            setNewPrice(price + 588)
        }
        if(addDays && addDays === 7){
            setNewPrice(price + 709)
        }
        if(addDays && addDays === 8){
            setNewPrice(price + 819)
        }
        if(addDays && addDays === 9){
            setNewPrice(price + 921)
        }
        if(addDays && addDays === 10){
            setNewPrice(price + 1014)
        }
        if(addDays && addDays === 11){
            setNewPrice(price + 1099)
        }
        if(addDays && addDays === 12){
            setNewPrice(price + 1177)
        }
        if(addDays && addDays === 13){
            setNewPrice(price + 1247)
        }
        if(addDays && addDays === 14){
            setNewPrice(price + 1311)
        }
        if(addDays && addDays === 15){
            setNewPrice(price + 1369)
        }
        if(addDays && addDays === 16){
            setNewPrice(price + 1420)
        }
        if(addDays && addDays === 17){
            setNewPrice(price + 1466)
        }
        if(addDays && addDays === 18){
            setNewPrice(price + 1507)
        }
        if(addDays && addDays === 19){
            setNewPrice(price + 1542)
        }
        if(addDays && addDays === 20){
            setNewPrice(price + 1573)
        }
        if(addDays && addDays === 21){
            setNewPrice(price + 1600)
        }
        if(addDays && addDays === 22){
            setNewPrice(price + 1623)
        }
        if(addDays && addDays === 23){
            setNewPrice(price + 1642)
        }
        if(addDays && addDays === 24){
            setNewPrice(price + 1657)
        }
        if(addDays && addDays === 25){
            setNewPrice(price + 1669)
        }
        if(addDays && addDays === 26){
            setNewPrice(price + 1678)
        }
        if(addDays && addDays === 27){
            setNewPrice(price + 1682)
        }
        if(addDays && addDays === 28){
            setNewPrice(price + 1684)
        }
        if(addDays && addDays === 29){
            setNewPrice(price + 1686)
        }
        if(addDays && addDays === 30){
            setNewPrice(price + 1688)
        }
    }*/

    /*React.useEffect(()=>{
        adicionaDias();
    }, [addDays])*/

    React.useEffect(()=>{
        buscaCep();
    }, [cep])


    
    /* Busca CEP*/
    async function buscaCep(){
        const url_fetch = fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET',
        })
        const response = await url_fetch;
        const json = await response.json();
        const faixaCep = (json.cep).split('-', 1);
        setStreet(json.logradouro);
        setBairro(json.bairro);
        setCountry(json.localidade)
        setState(json.uf)
        setLog(json.logradouro + ', ' + json.bairro + ', ' + json.localidade + ', ' + json.uf)
        if(faixaCep >= '11000' && faixaCep <= '11999'){
            setBilling(1800);
            setErrorCep('')
        }

        else if(faixaCep >= '12000' && faixaCep <= '19999'){
            setBilling(1800);
            setErrorCep('')
        }

        else if(faixaCep >= '06000' && faixaCep <= '09999'){
            setBilling(730);
            setErrorCep('')
        }

        else if(faixaCep >= '01000' && faixaCep <= '05999'){
            setBilling(320);
            setErrorCep('')
        }
        else{
            setErrorCep('Área fora de cobertura de nossos serviços.')
        }
    }


    function handleSubmit(e: React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        if(!cep || price === 0){
            setError(["Preencha todos os campos."])
        }
        else{
            navigate('/checkout')
        }
    }

   


  return (
    <div className={styles.rent}>
        <p className={styles.rent__title}>R$<label style={{fontSize: "2rem"}}> 239,00</label>/dia</p>
        <p className={styles.rent__title}>Escolha o período de locação</p>
        <form className={styles.rent__form}>
            <div className={styles.rent__form__date}>
                <div>
                    <label htmlFor="start">início</label>
                    <input type="date" name="start" onChange={(e)=>setStartDate(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="end">Devolução</label>
                    <input type="date" name="end" onChange={(e)=>setEndDate(e.target.value)}/>
                </div>
            </div>
            <div className={styles.rent__form__calc}>
                <label>Calcule o frete:</label>
                <input 
                    type="text" 
                    placeholder='Digite o CEP'
                    onChange={(e)=>setCep(e.target.value)}

                />
                
            </div>

            {errorCep? <p style={{color: 'red'}}>{errorCep}</p>: <p>{log}</p>}
            
            <div style={{padding: '1rem 0 0 0'}}>
                <label >Quantidade de dias: {totalDays}</label>
                {/*<div style={{display: 'flex', gridGap: ".5rem", padding: ".7rem 0"}}>
                <p>Adicionar mais dias: </p>
                <select onChange={(e:any)=>setAddDays(Number(e.target.value))}>
                <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}> 2</option>
                    <option value={3}>3 </option>
                    <option value={4}>4 </option>
                    <option value={5}>5 </option>
                    <option value={6}>6 </option>
                    <option value={7}>7 </option>
                    <option value={8}>8 </option>
                    <option value={9}>9 </option>
                    <option value={10}>10 </option>
                    <option value={11}>11 </option>
                    <option value={12}>12 </option>
                    <option value={13}>13 </option>
                    <option value={14}>14 </option>
                    <option value={15}>15 </option>
                    <option value={16}>16 </option>
                    <option value={17}>17 </option>
                    <option value={18}>18 </option>
                    <option value={19}>19 </option>
                    <option value={20}>20 </option>
                    <option value={21}>21 </option>
                    <option value={22}>22 </option>
                    <option value={23}>23 </option>
                    <option value={24}>24 </option>
                    <option value={25}>25 </option>
                    <option value={26}>26 </option>
                    <option value={27}>27 </option>
                    <option value={28}>28 </option>
                    <option value={29}>29 </option>
                    <option value={30}>30 </option>
                </select>
                </div>*/}
                <p style={{paddingTop: '.5rem'}}>Frete: {billing.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                <p style={{padding: '0.5rem 0 0 0'}}>Aluguel: {price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                <p className={styles.rent__price}>
                    TOTAL: {(price + billing).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                </p>
            </div>
            <input type="submit" style={{
                backgroundColor: "#44963b",
                boxShadow: "1px 10px 15px 2px #ccc",
                color: "#fff",
                width: "100%", 
                padding: "1rem",
                borderRadius: "9px",
                border: "none",
                marginTop: "1rem",
                fontSize: "1rem",
                cursor: "pointer",
                textTransform: "uppercase",
                fontWeight: "600",
                letterSpacing: "1px"
            }}
            value="Alugar"
            onClick={(e)=>handleSubmit(e)}/>
        </form>

        {error &&
            <MessageError message={error}/>
        }
        
    </div> 
  )
}

export default Rent;
