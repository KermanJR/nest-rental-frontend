import React from 'react';

import styles from './Rent.module.scss';



const Rent = () => {

    const [startDate, setStartDate] = React.useState<any>(null);
    const [endDate, setEndDate] = React.useState<any>(null);
    const [totalDays, setTotalDays] = React.useState<number>(0);
    const [price, setPrice] = React.useState<any>(137)
    const [addDays, setAddDays] = React.useState<number>(0)
    const [newPrice, setNewPrice] = React.useState<any>(null)
 

    function diferenceBetweenDate(e: React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        let date_1 = new Date(startDate);
        let date_2 = new Date(endDate);
        let difference = date_2.getTime() - date_1.getTime();
        let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
        setTotalDays(totalDays)
        let valor = calculaDias(totalDays)
        setPrice(valor)
    }

    function calculaDias(totalDays: number){
        let result: number = 0;
        if(totalDays === 1){
            return(137)
        }
        if(totalDays === 2){
            return(149)
        }
        if(totalDays === 3){
            return(164)
        }
        if(totalDays === 4){
            return(317)
        }
        if(totalDays === 5){
            return 458
           
        }
        if(totalDays === 6){
            return(588)
        }
        if(totalDays === 7){
            return(709)
        }
        if(totalDays === 8){
            return(819)
        }
        if(totalDays === 9){
            return(921)
        }
        if(totalDays === 10){
            return(1014)
        }
        if(totalDays === 11){
            return(1099)
        }
        if(totalDays === 12){
            return(1177)
        }
        if(totalDays === 13){
            return(1247)
        }
        if(totalDays === 14){
            return(1311)
        }
        if(totalDays === 15){
            return(1369)
        }
        if(totalDays === 16){
            return(1420)
        }
        if(totalDays === 17){
            return(1466)
        }
        if(totalDays === 18){
            return(1507)
        }
        if(totalDays === 19){
            return(1542)
        }
        if(totalDays === 20){
            return(1573)
        }
        if(totalDays === 21){
            return(1600)
        }
        if(totalDays === 22){
            return(1623)
        }
        if(totalDays === 23){
            return(1642)
        }
        if(totalDays === 24){
            return(1657)
        }
        if(totalDays === 25){
            return(1669)
        }
        if(totalDays === 26){
            return(1678)
        }
        if(totalDays === 27){
            return(1682)
        }
        if(totalDays === 28){
            return(1684)
        }
        if(totalDays === 29){
            return(1686)
        }
        if(totalDays === 30){
            return(1688)
        }
        else if(totalDays > 30){
            result = calculaDias(totalDays - 30) + 1688;
        }
    
        return result;
    }



    function adicionaDias(){
      
        if(addDays && addDays === 1){
            console.log(price + 137)
            setNewPrice(Number(price) + 137)
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
        if(addDays && addDays ===16){
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
    }

    React.useEffect(()=>{
        adicionaDias();
    }, [addDays])

   


  return (
    <div className={styles.rent}>
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
                <input type="text"/>
            </div>
            <div>
                <label>Quantidade de dias: {totalDays}</label>
                <div style={{display: 'flex', gridGap: ".5rem", padding: ".7rem 0"}}>
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
                </div>
                <p className={styles.rent__price}>Valor: R$ {addDays?  Number(newPrice).toFixed(2) : price.toFixed(2)}</p>
            </div>
            <input type="submit" style={{
                backgroundColor: "#125082",
                color: "#fff",
                width: "100%", 
                padding: "1rem",
                borderRadius: "9px",
                border: "none",
                marginTop: "1rem",
                fontSize: "1rem",
                cursor: "pointer"
            }}
            onClick={(e)=> diferenceBetweenDate(e)} value="Alugar"/>
        </form>
    </div> 
  )
}

export default Rent;
