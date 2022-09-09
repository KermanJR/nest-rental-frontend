import React from "react";
import styles from './Checkout.module.scss';
import { checkContext, CheckoutContext } from "../../context/CheckoutContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { useFetch } from "../../hooks/useFetch";
import { Title } from "../../components/Title/Title";
import { Document } from "../Document/Document";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading/Loading";
import { CREATE_DOCUMENT, CREATE_DOCUMENT_SIGNER, JOIN_DOCUMENT_SIGNER } from "../../api/Clicksign/ApiClicksign";







export const Checkout = () =>{

    const { request, error, data, loading} = useFetch();



    const razaoSocial = useAuth('');
    const fantasyName = useAuth('');
    const cnpj = useAuth('cnpj');

 
    const [inscEstadual, setInscEstadual] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [businessEmail, setBusinessEmail] = React.useState('');
    const [nameUser, setNameUser] = React.useState('');
    const [cpfUser, setCpfUser] = React.useState('');
    const [dateBirthday, setDateBirthday] = React.useState('');
    const [signKey, setSignKey] = React.useState('');
    const [tokenAuth, setTokenAuth] = React.useState('');
    const [keyDocument, setKeyDocument] = React.useState('');
    const [keySigner, setKeySigner] = React.useState('');
    const [keyDocumentSign, setKeyDocumentSign] = React.useState('');


    //Billing address
    const [billingStreet, setBillingStreet] = React.useState('');
    const [billingBairro, setBillingBairro] = React.useState('');
    const [billingCity, setBillingCity] = React.useState('');
    const [billingState, setBillingState] = React.useState('');
    const [ numberAddressBilling, setNumberAddressBilling] = React.useState('');
    const [ numberAddressPay, setNumberAddressPay] = React.useState('');

    const [billingAddress, setBillingAddress] = React.useState('');
    const [billingCep, setBillingCep] = React.useState('');

    const [errorData, setErrorData] = React.useState('');


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
        setBillingState(json.uf);
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
        street,
        bairro,
        country,
        contact,
        setContact,
        dataCheckout,
        state,
        setDataCheckout
    } = useContext(checkContext);

    function dataAtualFormatada(date: string){
            var data = new Date(date),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }



    const createModelDocument = async (e: React.MouseEvent<HTMLInputElement>) =>{
        e.preventDefault();
        if(cnpj.validate() && razaoSocial && fantasyName && inscEstadual 
            && businessEmail && numberAddressPay && numberAddressBilling){
            const { url, options } = CREATE_DOCUMENT({
                "document": {
                    "path": "/modelos/teste.docx",
                    "template": {
                        "data": {
                        "fantasy_name": fantasyName.value,
                        "address_pay": `${street}, ${bairro}, ${country}, N°${numberAddressPay}`, 
                        "address_billing": `${billingStreet}, ${billingBairro}, ${billingCity}, N°${numberAddressBilling}`,
                        "contact": businessEmail,
                        "business_email": businessEmail,
                        "name_user": nameUser,
                        "date_birthday": dateBirthday,
                        "total_days": totalDays,
                        "initial_date": dataAtualFormatada(startDate),
                        "final_date": dataAtualFormatada(endDate),
                        "documentation": cpfUser,
                        "cnpj": cnpj.value,
                        "billing": billing.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                        "total": (price + billing).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                        "machine_name": "Ecolift-50",
                        "code_contract": Math.floor(Math.random()*650),
                        "price_product": price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                        "phone_number": contact
                        }
                    },
                }
            })
            const  { key } = await request(url, options);
            setKeyDocument(key);
        }else{
            setErrorData('Preencha todos os campos obrigatórios.')
        }
         
    }
        

    const createDocumentKey = async (keySign: string) =>{
            const fetchDocumentKey = fetch('https://nestrental-back.herokuapp.com/create-document', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    "list": {
                        "document_key": keyDocument,
                        "signer_key": keySign,
                        "sign_as": "sign",
                        "refusable": true,
                        "message": `Prezado ${nameUser},\nPor favor assine o documento.\n\nQualquer dúvida estou à disposição.\n\nAtenciosamente,\nNest Rental.`
                    }
                })
            })
            const response = await fetchDocumentKey;
            const json = await response.json();
            const key = await json?.data;
            setKeyDocumentSign(key);
            window.localStorage.setItem('document_key', key)
        }      
    


    const createSignerDocument = async (e: React.FormEvent<HTMLInputElement>) =>{
        e.preventDefault();
        if(cpfUser && email && dateBirthday && contact && nameUser){
            if(!keyDocumentSign){
                const { url, options } = CREATE_DOCUMENT_SIGNER({
                    "signer": {
                        "email": businessEmail,
                        "phone_number": contact,
                        "auths": [
                        "email"
                        ],
                        "name": nameUser,
                        "documentation": cpfUser,
                        "birthday": dateBirthday,
                        "has_documentation": true,
                        "selfie_enabled": false,
                        "handwritten_enabled": false,
                        "official_document_enabled": false,
                        "liveness_enabled": false,
                        "facial_biometrics_enabled": false
                    }
                })
                const  { key } = await request(url, options);
                setKeySigner(key);
                setTimeout(()=>{
                    createDocumentKey(key);
                }, 5000)
            }else{
                setErrorData('Este contrato já foi gerado...')
            }
        }else{
            setErrorData('Preencha todos os campos obrigatórios.')
        }
    }


    

    const getTokenAuthorization = async () =>{
        try{
            let fetchGenerateToken = fetch('https://nestrental-back.herokuapp.com/generate-token', {
                method: 'POST'
            })
            let response = await fetchGenerateToken;
            let json = await response.json();
            window.localStorage.setItem('access_token', json.access_token);
            setTokenAuth(json.access_token);
        }catch(error){
            console.log(error);
        }
    }


    const refreshToken = async (tokenAuth: any)=>{
        
            try{
                const teste = fetch('https://nestrental-back.herokuapp.com/refresh-token', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },body: JSON.stringify({
                        "tkn": tokenAuth
                    })
                    
                })
                const response = await teste;
                const json = await response.json();
                setTokenAuth(json.access_token);
            }catch(err){
                console.log(err)
            }
        
    }


    
    /*const sendLead = async () =>{
        let wtoken = window.localStorage.getItem('access_token');
        if(wtoken != ''){
            try{
                const teste = fetch('http://localhost:6800/send-lead', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },body: JSON.stringify({

                        "xxx": {
                            "data": [
                            {
                                "Company": nameLocataria,
                                "Last_Name": nameUser,
                                "First_Name": nameUser,
                                "Email": businessEmail,
                                "State": "Brasil",
                                "$wizard_connection_path": [
                                "3652397000003679053"
                                ],
                                "Wizard": {
                                "id": "3652397000003677001"
                                }
                            }
                            ],

                            "lar_id": "3652397000002045001",
                            "trigger": [
                            "approval",
                            "workflow",
                            "blueprint"
                            ],
                        },
                        "token": wtoken

                      })
                })
                const response = await teste;
                const json = await response.json();
                console.log(json)
                
            }catch(err){
                console.log(err)
            }
        }
    }*/


    

    React.useEffect(()=>{
        buscaCep();
    }, [billingCep])

    React.useEffect(()=>{
        getTokenAuthorization();
    }, [])

    /*setInterval(()=>{
        refreshToken(tokenAuth);
    },10000)*/

    return(

        <>
        {loading && 
            <Loading/>
        }
      
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

    {!keyDocument && <section style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2rem 5rem',
            marginTop: '2rem'
        }}>
            <form className={styles.formCheckout}>
                <h3 className={styles.formCheckout__title}>Empresa</h3>
                <div className={styles.formCheckout__div}>
                   
                        <input type="text" id="total_days" name="total_days" value={totalDays} style={{display: 'none'}}/>
                        <input type="text" id="billing" name="billing" value={billing} style={{display: 'none'}}/>
                        <input type="text" id="total" name="total" value={price? price: newPrice} style={{display: 'none'}}/>
                        <input type="text" id="address_pay" name="address_pay" value={`${street}, ${bairro}, ${country}, ${number}`} style={{display: 'none'}}/>

                        <Input
                            type="text"
                            label="Razão social"
                            name="razao_social"
                            id="razao_social"
                            placeholder="Digite aqui"
                            {...razaoSocial}
                        />
              
                        <Input
                            type="text"
                            label="Nome fantasia*"
                            name="fantasy_name"
                            id="fantasy_name"
                            placeholder="Digite aqui"
                            {...fantasyName}
                        />
                    
                        <Input
                            type="text"
                            label="CNPJ*"
                            name="cnpj"
                            id="cnpj"
                            placeholder="xx.xxx.xxx/xxxx-xx"
                            {...cnpj}
                        />
                    
                </div>
                
                <div className={styles.formCheckout__div}>
                    
                    <div>
                        <label>Inscrição Estadual*</label>
                        <input 
                            type="text" 
                            id="insc_estadual" name="insc_estadual" 
                            onChange={(e)=>setInscEstadual(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email*</label>
                        <input 
                            type="email" 
                            id="business_email" 
                            name="business_email"
                            placeholder="Digite aqui"
                            required
                            onChange={(e)=>setBusinessEmail(e.target.value)}
                        />
                    </div>
                </div>


                {/* DETALHES DO FATURAMENTO*/}

                <Title level={3}>
                    Detalhes do faturamento
                </Title>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>CEP</label>
                        <input 
                            type="text" 
                            id="" 
                            name="" 
                            defaultValue={cep}
                            disabled
                        />
                    </div>
                    <div>
                        <label>Rua/Av*</label>
                        <input 
                            type="text" 
                            id="street" 
                            name="street" 
                            value={street}
                            disabled
                        />
                    </div>
                    <div>
                        <label>Número*</label>
                        <input 
                            type="text" 
                            id="number" 
                            placeholder="Digite aqui"
                            name="number"
                            onChange={(e)=>setNumberAddressPay(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.formCheckout__div}>
                <div>
                        <label>Bairro*</label>
                        <input 
                            type="text" 
                            id="bairro" 
                            name="bairro" 
                            value={bairro}
                            disabled
                        />
                    </div>
                    <div>
                        <label>Complemento</label>
                        <input 
                            type="text" 
                            id="" 
                            name=""
                            placeholder="Digite aqui"
                        />
                    </div>
                    
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Cidade*</label>
                        <input 
                            type="text" 
                            id="country" 
                            name="country" 
                            value={country}
                            disabled
                        />
                    </div>
                    <div>
                        <label>UF*</label>
                        <input type="text" id="" name="" defaultValue={state}/>
                    </div>
                    
                </div>

                
                


                <Title 
                    level={3}
                    >
                    Detalhes de entrega
                </Title>

                <div className={styles.formCheckout__div}>
                <div>
                        <label>CEP*</label>
                        <input 
                            type="text" 
                            id="" 
                            name="" 
                            placeholder="Digite seu CEP"
                            onChange={(e)=>setBillingCep(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Rua/Av*</label>
                        <input 
                            type="text" 
                            id="street" 
                            name="street" 
                            value={billingStreet}
                            disabled
                        />
                    </div>
                    <div>
                        <label>Número*</label>
                        <input 
                            type="text" 
                            id="number" 
                            name="number"
                            placeholder="Digite aqui"
                            onChange={(e)=>setNumberAddressBilling(e.target.value)}
                        />
                    </div>
                    
                </div>

                <div className={styles.formCheckout__div}>
                <div>
                        <label>Bairro*</label>
                        <input 
                            type="text" 
                            id="bairro" 
                            name="bairro" 
                            value={billingBairro}
                            disabled
                        />
                    </div>
                    <div>
                        <label>Complemento</label>
                        <input 
                            type="text" 
                            id="" 
                            placeholder="Digite aqui"
                            name=""
                        />
                    </div>
                    
                </div>

                <div className={styles.formCheckout__div}>
                    <div>
                        <label>Cidade*</label>
                        <input 
                            type="text" 
                            id="country" 
                            name="country" 
                            value={billingCity}
                            disabled
                        />
                    </div>
                    <div>
                        <label>UF*</label>
                        <input type="text" id="" name="" defaultValue={billingState}/>
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
                value="Finalizar aluguel"
                onClick={(e)=>createModelDocument(e)}
                />
            </form> 
            {errorData && <p style={{color: 'red', textAlign: 'center', paddingTop: '.5rem', fontSize: '.7rem'}}>{errorData}</p>}
        </div>
    </section>}


    {keyDocument &&
        <section style={{paddingRight: '5rem'}}>
            <div style={{padding: '.5rem 5rem'}}>
                <Title level={3}>
                    Detalhes do usuário:
                </Title>
            </div>
            <section style={{display: 'flex', justifyContent: 'space-between'}}>
            <form style={{padding: "1rem 5rem"}}>
            <div className={styles.formCheckout__div}>
                <div>
                    <label>Nome*</label>
                    <input 
                        type="text"
                        id="name_user"
                        name="name_user"
                        onChange={(e)=>setNameUser(e.target.value)}
                        placeholder="Digite seu nome"
                    />
                </div>
                
                <div>
                    <label>CPF*</label>
                    <input 
                        type="text"
                        id="cpf_user"
                        name="cpf_user"
                        placeholder="000.000.000-00"
                        onChange={(e)=>setCpfUser(e.target.value)}
                    />
                </div>
                
                <div>
                    <label>Data de nascimento*</label>
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
                    <label>E-mail*</label>
                    <input 
                        type="text" 
                        id="email_user" 
                        name="email_user"
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="seuemail@gmail.com"
                    />
                </div>
                <div>
                    <label>Telefone*</label>
                    <input 
                        type="text" 
                        id="contact" 
                        name="contact"
                        placeholder="(00) 00000-0000"
                        onChange={(e)=>setContact(e.target.value)}
                    />
                </div>
            </div>
              
                {errorData && <p style={{color: 'red', textAlign: 'left', paddingTop: '.5rem', fontSize: '.7rem'}}>{errorData}</p>}
            </form>
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
                value="Finalizar aluguel"
                onClick={(e)=>createSignerDocument(e)}
                />
            </form> 
        </div>
        </section>
   
     </section>
    }

    {keyDocumentSign &&
    <>
        <div  style={{padding: '1rem 5rem'}}>
            <Title level={1}>
                Visualização do contrato de aluguel:
            </Title>
            <Document/>
        </div>
    </>
    }

    
</>
    );
}
