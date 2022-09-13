import React from "react";
import { createContext } from "react";



export type PropsContextType = {
    cep: string,
    setCep: (cep: string) => void,
    totalDays: number,
    setTotalDays: (totalDays: number) => void,
    billing: number,
    setBilling: (billing: number)=>void,
    price: number,
    setPrice: (price: number)=> void,
    newPrice: number,
    setNewPrice: (newPrice: number) => void,
    calculaValorDias: (totalDays: number) => void,
    startDate: string,
    endDate: string,
    setStartDate: (startDate: string)=>void,
    setEndDate:(endDate: string)=>void,
    nameLocataria: string,
    setNameLocataria: (name: string) =>void,
    street: string,
    bairro: string,
    country: string,
    state: string,
    setStreet: (street: string) =>void,
    setBairro: (bairro: string) =>void,
    setCountry: (country: string) =>void,
    setState: (state: string)=>void;
    contact: string,
    setContact: (contact: string)=>void,
    dataCheckout: Array<{}>,
    setDataCheckout: ()=> void;

}
export const checkContext = React.createContext<PropsContextType>({
    cep: '',
    setCep: ()=> '',
    totalDays: 0,
    setTotalDays: (totalDays: number)=>'',
    billing: 0,
    setBilling: ()=> '',
    price: 0,
    setPrice: ()=> 0,
    newPrice: 0,
    setNewPrice: ()=>0,
    calculaValorDias: (totalDays: number)=>'',
    startDate: '',
    endDate: '',
    setStartDate: ()=> '',
    setEndDate: ()=> '',
    nameLocataria: '',
    setNameLocataria: ()=>'',
    street: '',
    bairro: '',
    country: '',
    state: '',
    setStreet: () =>'',
    setBairro: () =>'',
    setCountry: () =>'',
    setState: ()=>'',
    contact: '',
    setContact: () => '',
    dataCheckout: [{}],
    setDataCheckout: ()=>''
});



 export const CheckoutContext = ({children}: any) =>{
    const [cep, setCep] = React.useState('');
    const [totalDays, setTotalDays] = React.useState<number>(0);
    const [billing, setBilling] = React.useState<number>(0);
    const [price, setPrice] = React.useState<number>(0)
    const [newPrice, setNewPrice] = React.useState<any>(0)
    const [startDate, setStartDate] = React.useState<string>('');
    const [endDate, setEndDate] = React.useState<string>('');
    const [nameLocataria, setNameLocataria] = React.useState('')
    const [street, setStreet] = React.useState<string>('');
    const [bairro, setBairro] = React.useState<string>('');
    const [country, setCountry] = React.useState<string>('');
    const [state, setState] = React.useState<string>('');
    const [contact, setContact] = React.useState<string>('');


    const [dataCheckout, setDataCheckout] = React.useState('');

    let difference: number = 0
    let valor: number = 0

    function diferenceBetweenDate(){
        if(startDate != null && endDate != null){
            let date_1 = new Date(startDate);
            let date_2 = new Date(endDate);
            if(date_1 > date_2){
                difference = date_1.getTime() - date_2.getTime();
            }else if(date_2 > date_1){
                difference = date_2.getTime() -  date_1.getTime();
            }

            //Calcula qtd de dias entre duas datas
            setTotalDays(Math.ceil(difference / (1000 * 3600 * 24)))
        }else{
            difference = 0;
            valor = 0
        }
    }

    
    function calculaValorDias(totalDays: number){
        let result: number = 0;
        if(totalDays === 1){
            setPrice(137)
            return(137)
        }
        if(totalDays === 2){
            setPrice(149)
            return(149)
        }
        if(totalDays === 3){
            setPrice(164)
            return(164)
        }
        if(totalDays === 4){
            setPrice(317)
            return(317)
        }
        if(totalDays === 5){
            setPrice(458)
            return(458)
           
        }
        if(totalDays === 6){
            setPrice(588)
            return(588)
        }
        if(totalDays === 7){
            setPrice(709)
            return(709)
        }
        if(totalDays === 8){
            setPrice(819)
            return(819)
        }
        if(totalDays === 9){
            setPrice(921)
            return(921)
        }
        if(totalDays === 10){
            setPrice(1014)
            return(1014)
        }
        if(totalDays === 11){
            setPrice(1099)
            return(1099)
        }
        if(totalDays === 12){
            setPrice(1177)
            return(1177)
        }
        if(totalDays === 13){
            setPrice(1247)
            return(1247)
        }
        if(totalDays === 14){
            setPrice(1311)
            return(1311)
        }
        if(totalDays === 15){
            setPrice(1369)
            return(1369)
        }
        if(totalDays === 16){
            setPrice(1420)
            return(1420)
        }
        if(totalDays === 17){
            setPrice(1466)
            return(1466)
        }
        if(totalDays === 18){
            setPrice(1507)
            return(1507)
        }
        if(totalDays === 19){
            setPrice(1542)
            return(1542)
        }
        if(totalDays === 20){
            setPrice(1573)
            return(1573)
        }
        if(totalDays === 21){
            setPrice(1600)
            return(1600)
        }
        if(totalDays === 22){
            setPrice(1623)
            return(1623)
        }
        if(totalDays === 23){
            setPrice(1642)
            return(1642)
        }
        if(totalDays === 24){
            setPrice(1657)
            return(1657)
        }
        if(totalDays === 25){
            setPrice(1669)
            return(1669)
        }
        if(totalDays === 26){
            setPrice(1678)
            return(1678)
        }
        if(totalDays === 27){
            setPrice(1682)
            return(1682)
        }
        if(totalDays === 28){
            setPrice(1684)
            return(1684)
        }
        if(totalDays === 29){
            setPrice(1686)
            return(1686)
        }
        if(totalDays === 30){
            setPrice(1688)
            return(1688)
        }
        else if(totalDays > 30){

            let comp = totalDays - 30
            console.log(comp)
            result = calculaValorDias(comp) + 1688;
            console.log(result)
            setPrice(result)
        }
    
        return result;
    }

    React.useEffect(()=>{
        diferenceBetweenDate()
    }, [startDate, endDate]);

    React.useEffect(()=>{
        calculaValorDias(totalDays)
    }, [totalDays]);
    
    return(
        <checkContext.Provider value={{
            cep,
            setCep,
            totalDays,
            billing,
            setBilling,
            price,
            setPrice,
            setTotalDays,
            newPrice,
            setNewPrice,
            calculaValorDias,
            startDate,
            endDate,
            setEndDate,
            setStartDate,
            nameLocataria,
            setNameLocataria,
            street,
            setStreet,
            bairro,
            setBairro,
            country,
            setCountry,
            contact,
            setContact,
            state,
            setState,
            dataCheckout: [],
            setDataCheckout: () => ''

        }}>
            {children}
        </checkContext.Provider>
    )
}