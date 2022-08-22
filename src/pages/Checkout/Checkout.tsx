import React from "react";
import Container from "../../components/Container/Container";
import styles from './Checkout.module.scss';
import { checkContext } from "../../context/CheckoutContext";
import { useContext } from "react";




export const Checkout = () =>{
    const {
        cep,
        setCep,
        totalDays,
        billing,
        price,
        setPrice,
        newPrice,
        startDate,
        endDate
    } = useContext(checkContext);

    /*function createSignatary(e: React.FormEvent<HTMLInputElement>){
        console.log(e)
        e.preventDefault();
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "signer": {
    "email": "fulano@example.com",
    "phone_number": "11999999999",
    "auths": [
      "email"
    ],
    "name": "Marcos Zumba",
    "documentation": "123.321.123-40",
    "birthday": "1983-03-31",
    "has_documentation": true,
    "selfie_enabled": false,
    "handwritten_enabled": false,
    "official_document_enabled": false,
    "liveness_enabled": false,
    "facial_biometrics_enabled": false
  }
});

var requestOptions: RequestInit = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://sandbox.clicksign.com/api/v1/signers?access_token=3c40d95b-ebb6-45cb-a179-6e8c76e513ba", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    }

    function handleSubmit(e: React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        try{
            var axios = require('axios');
            var data = JSON.stringify({
                "signer": {
                    "email": "fulano@example.com",
                    "phone_number": "11999999999",
                    "auths": [
                    "email"
                    ],
                    "name": "Marcos Zumba",
                    "documentation": "123.321.123-40",
                    "birthday": "1983-03-31",
                    "has_documentation": true,
                    "selfie_enabled": false,
                    "handwritten_enabled": false,
                    "official_document_enabled": false,
                    "liveness_enabled": false,
                    "facial_biometrics_enabled": false
                }
            });

            var config = {
                method: 'post',
                url: 'https://sandbox.clicksign.com/api/v1/signers?access_token=3c40d95b-ebb6-45cb-a179-6e8c76e513ba',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            axios(config)
            .then(function (response: { data: any; }) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error: any) {
                console.log(error);
            });

        }catch(err){
            console.log(err)
        }
    }*/
    
    return(
        <>
            <section style={{
                backgroundColor: "#125082",
                padding: "1rem 5rem",
                height: "150px",
                display: "flex",
                alignItems: "center"
            }}>
            <h1 style={{
                color:"#fff",
                textTransform: "uppercase"
            }}>Pedido</h1>
            </section>

        <section style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2rem 5rem',
            marginTop: '2rem'
        }}>
            <form className={styles.formCheckout}>
                <h3 className={styles.formCheckout__title}>Empresa</h3>
                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Razão Social:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                    <div>
                        <label>Nome fantasia:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>CNPJ:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                    <div>
                        <label>Inscrição Estadual:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                </div>

                <h3 className={styles.formCheckout__title}>Detalhes do faturamento</h3>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Rua/Av:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                    <div>
                        <label>Número:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Complemento</label>
                        <input type="text" id="" name=""/>
                    </div>
                    <div>
                        <label>Bairro:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Cidade</label>
                        <input type="text" id="" name=""/>
                    </div>
                    <div>
                        <label>UF:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                    <div>
                        <label>CEP:*</label>
                        <input type="text" id="" name="" defaultValue={cep}/>
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Nome:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                    <div>
                        <label>Telefone:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                </div>

                <div className={styles.formCheckout__div}> 
                    <div>
                        <label>E-mail:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                </div>
            </form>

        {/***********************************************************/}
        <div className={styles.formCheckout__div2}>
            <form >
                <div className={styles.formCheckout__date}>
                    <div>
                        <label htmlFor="start">início</label>
                        <input type="date" name="start" value={startDate} disabled/>
                    </div>
                    <div>
                        <label htmlFor="end">Devolução</label>
                        <input type="date" name="end" value={endDate} disabled/>
                    </div>
                </div>
        
                
                <div style={{padding: '1rem 0 0 0'}}>
                    <p >Quantidade de dias: {totalDays}</p>
                    <div style={{padding: ".7rem 0"}}>
                        
                        <p>Frete: {billing.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                        <p style={{padding: '0.5rem 0 0 0'}}>Aluguel: {price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                        <p style={{
                            paddingTop: '.5rem'
                        }}>
                            TOTAL: 
                            {
                                newPrice?
                                    (newPrice + billing).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}): 
                                    price ?(price + billing).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}): ''
                            }
                        </p>
                    </div>
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
                value="Alugar"
                
                />
            </form> 
        </div>
    </section>
</>
    );
}