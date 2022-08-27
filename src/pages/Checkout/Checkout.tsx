import React from "react";
import styles from './Checkout.module.scss';
import { checkContext } from "../../context/CheckoutContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_POST } from "../../api/Zoho/ApiZoho";
import { useFetch } from "../../hooks/useFetch";
import { Title } from "../../components/Title/Title";






export const Checkout = () =>{

    const navigate = useNavigate();
    const { request, error, loading, data} = useFetch();

    const [razaoSocial, setRazaoSocial] = React.useState('');
    const [inscEstadual, setInscEstadual] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [businessEmail, setBusinessEmail] = React.useState('');
    const [nameUser, setNameUser] = React.useState('');
    const [cpfUser, setCpfUser] = React.useState('');
    const [dateBirthday, setDateBirthday] = React.useState('');
    const [signKey, setSignKey] = React.useState<string>('');
    const [tokenAuth, setTokenAuth] = React.useState<string>('');



    //Billing address
    const [billingStreet, setBillingStreet] = React.useState('');
    const [billingBairro, setBillingBairro] = React.useState('');
    const [billingCity, setBillingCity] = React.useState('');
    const [billingCountry, setBillingCountry] = React.useState('');
    const [billingAddress, setBillingAddress] = React.useState('');
    const [billingCep, setBillingCep] = React.useState('');

    /* Busca CEP*/
    async function buscaCep(){
        const url_fetch = fetch(`https://viacep.com.br/ws/${billingCep}/json/`, {
            method: 'GET',
        })
        const response = await url_fetch;
        const json = await response.json();
        const faixaCep = (json.cep).split('-', 1);
        setBillingStreet(json.logradouro);
        setBillingBairro(json.bairro);
        setBillingCity(json.localidade)
        setBillingAddress(json.logradouro + ', ' + json.bairro + ', ' + json.localidade)
    }

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


    const createModelDocument = async (e: React.FormEvent<HTMLInputElement>) =>{
        e.preventDefault();
        try{
            let teste = fetch('https://nestrental-back.herokuapp.com/create-model', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    "document": {
                        "path": "/modelos/teste.docx",
                          "template": {
                            "data": {
                              "fantasy_name": nameLocataria,
                              "address_pay": `${street}, ${bairro}, ${country}`,
                              "address_billing": `${billingStreet}, ${billingBairro}, ${billingCity}`,
                              "contact": contact,
                              "business_email": businessEmail,
                              "name_user": nameUser,
                              "date_birthday": dateBirthday,
                              "total_days": totalDays,
                              "documentation": cpfUser,
                              "cnpj": cnpj,
                              "billing": billing,
                              "total": price? price: newPrice,
                              "machine_name": "Ecolift-50"
                            }
                          },
                      }
                })
            })
            let response = await teste;
            let dataJson = await response.json();
            if(dataJson.request_signature_key != ""){
                console.log(dataJson);
                setSignKey(dataJson.request_signature_key);
                window.localStorage.setItem('key_signature', dataJson.request_signature_key);

                //Envia lead para o Zoho CRM
                getTokenAuthorization();
                sendLead();
                navigate('/contrato');
            }
            
        }catch(err){
            console.log(err);
        }
    }

    const getTokenAuthorization = async () =>{
        try{
            let teste = fetch('https://nestrental-back.herokuapp.com/generate-token', {
                method: 'POST'
            })
            let response = await teste;
            let json = await response.json();
            window.localStorage.setItem('access_token', json.message);
            setTokenAuth(json.message);
            console.log(json)
        }catch(error){
            console.log(error);
        }
        
    }

    

    const sendLead = async () =>{
        if(tokenAuth != ''){
            try{
                const teste = fetch('https://nestrental-back.herokuapp.com/send-lead', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },body: JSON.stringify({
                        "data":[
                            {
                                "Email": businessEmail
                            }
                        ]
                    })
                    
                })
                const response = await teste;
                const json = await response.json();
                console.log(json);
            }catch(err){
                console.log(err)
            }
        }
    }

    React.useEffect(()=>{
        buscaCep();
    }, [billingCep])

   

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

                        <input type="text" id="total_days" name="total_days" value={totalDays} style={{display: 'none'}}/>
                        <input type="text" id="billing" name="billing" value={billing} style={{display: 'none'}}/>
                        <input type="text" id="total" name="total" value={price? price: newPrice} style={{display: 'none'}}/>
                        <input type="text" id="address_pay" name="address_pay" value={`${street}, ${bairro}, ${country}, ${number}`} style={{display: 'none'}}/>

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
                            id="fantasy_name" 
                            name="fantasy_name"
                            onChange={(e)=>setNameLocataria(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>CNPJ:*</label>
                        <input 
                            type="text" 
                            id="cnpj" 
                            name="cnpj" 
                            onChange={(e)=>setCnpj(e.target.value)}
                            placeholder="XX. XXX. XXX/0001-XX"
                        />
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                    
                    <div>
                        <label>Inscrição Estadual:*</label>
                        <input 
                            type="text" 
                            id="insc_estadual" name="insc_estadual" 
                            onChange={(e)=>setInscEstadual(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email(empresarial):*</label>
                        <input 
                            type="email" 
                            id="business_email" name="business_email" 
                            onChange={(e)=>setBusinessEmail(e.target.value)}
                        />
                    </div>
                </div>


                <Title 
                    level={3}
                    >
                    Detalhes do usuário
                </Title>
                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Nome:*</label>
                        <input 
                            type="text"
                            id="name_user"
                            name="name_user"
                            onChange={(e)=>setNameUser(e.target.value)}
                            placeholder="Digite seu nome"
                        />
                    </div>
                    
                    <div>
                        <label>CPF:*</label>
                        <input 
                            type="text"
                            id="cpf_user"
                            name="cpf_user"
                            placeholder="000.000.000-00"
                            onChange={(e)=>setCpfUser(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label>Data de nascimento:*</label>
                        <input 
                            type="date"
                            id="date_birthday"
                            name="date_birthday"
                            onChange={(e)=>setDateBirthday(e.target.value)}
                        />
                    </div>
                    
                </div>

                <div className={styles.formCheckout__div}> 
                    <div>
                        <label>E-mail:*</label>
                        <input 
                            type="text" 
                            id="email_user" 
                            name="email_user"
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="seuemail@gmail.com"
                        />
                    </div>
                    <div>
                        <label>Telefone:*</label>
                        <input 
                            type="text" 
                            id="contact" 
                            name="contact"
                            placeholder="67992658458"
                            onChange={(e)=>setContact(e.target.value)}
                        />
                    </div>
                </div>


                {/* DETALHES DO FATURAMENTO*/}

                <Title 
                    level={3}
                    >
                    Detalhes do faturamento
                </Title>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Rua/Av:*</label>
                        <input 
                            type="text" 
                            id="street" 
                            name="street" 
                            value={street}
                            disabled
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
                    <div>
                        <label>CEP:*</label>
                        <input 
                            type="text" 
                            id="" 
                            name="" 
                            defaultValue={cep}
                            disabled
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
                            disabled
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
                            disabled
                        />
                    </div>
                    <div>
                        <label>UF:*</label>
                        <input type="text" id="" name=""/>
                    </div>
                    
                </div>

                
                


                <Title 
                    level={3}
                    >
                    Detalhes de entrega
                </Title>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Rua/Av:*</label>
                        <input 
                            type="text" 
                            id="street" 
                            name="street" 
                            value={billingStreet}
                            disabled
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
                    <div>
                        <label>CEP:*</label>
                        <input 
                            type="text" 
                            id="" 
                            name="" 
                            onChange={(e)=>setBillingCep(e.target.value)}
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
                            value={billingBairro}
                            disabled
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
                            value={billingCity}
                            disabled
                        />
                    </div>
                    <div>
                        <label>UF:*</label>
                        <input type="text" id="" name=""/>
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
                onClick={(e)=>createModelDocument(e)}
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
