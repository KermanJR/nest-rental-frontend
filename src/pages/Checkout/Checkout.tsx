import React from "react";
import Container from "../../components/Container/Container";
import styles from './Checkout.module.scss';
import { checkContext } from "../../context/CheckoutContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export const Checkout = () =>{

    const navigate = useNavigate();

    const [razaoSocial, setRazaoSocial] = React.useState('');
    const [inscEstadual, setInscEstadual] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const {
        cep,
        setCep,
        totalDays,
        billing,
        price,
        setPrice,
        newPrice,
        startDate,
        endDate,
        nameLocataria,
        setNameLocataria,
        cnpj, setCnpj,
        street,
        bairro,
        country,
        contact,
        setContact
    } = useContext(checkContext);


    function createDocument(e: React.FormEvent<HTMLInputElement>){
        e.preventDefault();
    }

    function teste(e: React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        try{
            fetch('https://sandbox.clicksign.com/api/v1/templates/96bee646-4a82-4b4d-9299-daa381f38725/documents?access_token=befe028e-684c-4193-b73a-005205daa727', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "document": {
                    "path": "/modelos/nestteste.docx",
                    "template": {
                    "data": {
                      "fantasy_name": "Nome teste 123",
                      "address": "R. Teodoro Sampaio 2767, 10° andar",
                      "contact": "67995949494",
                      "totalDays": 6,
                      "cnpj": "611626",
                      "billing": 1900,
                      "total": 3600,
                      "machine_name": "Ecolift-50"
                    }
                    },
                    "signers": [
                        "kermanpereira@gmail.com"
                    ]
                    }
                })
            })
            
                .then(r=>{
                    return r;
                }).then(r=>{
                    return r.json();
                }).then(r=>{
                    console.log(r)
                })

        }catch(err){
            console.log(err)
        }
    }
    
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

                        <input type="text" id="total_days" name="total_days" value={totalDays}/>
                        <input type="text" id="billing" name="billing" value={billing}/>
                        <input type="text" id="total" name="total" value={price? price: newPrice}/>

                        <label>Razão Social:*</label>
                        <input 
                            type="text" 
                            id="razao_social" 
                            name="razao_social"
                            onChange={(e)=>setRazaoSocial(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Nome fantasia:*</label>
                        <input 
                            type="text" 
                            id="company_name" 
                            name="company_name"
                            onChange={(e)=>setNameLocataria(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>CNPJ:*</label>
                        <input 
                            type="text" 
                            id="cnpj" 
                            name="cnpj" 
                            onChange={(e)=>setCnpj(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Inscrição Estadual:*</label>
                        <input 
                            type="text" 
                            id="insc_estadual" name="insc_estadual" 
                            onChange={(e)=>setInscEstadual(e.target.value)}
                        />
                    </div>
                </div>


                {/* DETALHES DO FATURAMENTO*/}

                <h3 className={styles.formCheckout__title}>Detalhes do faturamento</h3>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Rua/Av:*</label>
                        <input 
                            type="text" 
                            id="street" 
                            name="street" 
                            value={street}
                        />
                    </div>
                    <div>
                        <label>Número:*</label>
                        <input 
                            type="text" 
                            id="number" 
                            name="number"
                            onChange={(e)=>setNumber(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Complemento</label>
                        <input 
                            type="text" 
                            id="" 
                            name=""
                        />
                    </div>
                    <div>
                        <label>Bairro:*</label>
                        <input 
                            type="text" 
                            id="bairro" 
                            name="bairro" 
                            value={bairro}
                        />
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Cidade</label>
                        <input 
                            type="text" 
                            id="country" 
                            name="country" 
                            value={country}
                        />
                    </div>
                    <div>
                        <label>UF:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                    <div>
                        <label>CEP:*</label>
                        <input 
                            type="text" 
                            id="" 
                            name="" 
                            defaultValue={cep}
                        />
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Nome:*</label>
                        <input type="text" id="name" name="name"/>
                    </div>
                    <div>
                        <label>Telefone:*</label>
                        <input 
                            type="text" 
                            id="contact" 
                            name="contact"
                            onChange={(e)=>setContact(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.formCheckout__div}> 
                    <div>
                        <label>E-mail:*</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
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
                onClick={(e)=>teste(e)}
                />
                
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
