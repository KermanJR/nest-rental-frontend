import React from "react";
import styles from './Checkout.module.scss';
import { checkContext, CheckoutContext } from "../../context/CheckoutContext";
import { useContext } from "react";
import { Input } from "../../components/Input/Input";
import { useFetch } from "../../hooks/useFetch";
import { Title } from "../../components/Title/Title";
import { Document } from "../Document/Document";
import { useForm } from "../../hooks/useForm";
import { Loading } from "../../components/Loading/Loading";
import { CREATE_DOCUMENT, CREATE_DOCUMENT_SIGNER, JOIN_DOCUMENT_SIGNER } from "../../api/Clicksign/ApiClicksign";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import { Link } from "react-router-dom";







export const Checkout = () =>{

    const { request, error, data, loading} = useFetch();



    const razaoSocial = useForm('');
    const fantasyName = useForm('');
    const cnpj = useForm('cnpj');
    const insc_estadual = useForm('insc_estadual');
    const email_company = useForm('email')
    const email_user = useForm('email');
    const tel_company = useForm('telefone');
    const tel_user = useForm('telefone');

 
    const [inscEstadual, setInscEstadual] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [businessEmail, setBusinessEmail] = React.useState('');
    const [nameUser, setNameUser] = React.useState('');
    const [cpfUser, setCpfUser] = React.useState('');
    const [dateBirthday, setDateBirthday] = React.useState('');
    const [signKey, setSignKey] = React.useState('');
    const [tokenAuth, setTokenAuth] = React.useState('');
    const [tokenRefresh, setTokenRefresh] = React.useState('');
    const [keyDocument, setKeyDocument] = React.useState('');
    const [keySigner, setKeySigner] = React.useState('');
    const [keyDocumentSign, setKeyDocumentSign] = React.useState('');


    //Billing address
    const [billingStreet, setBillingStreet] = React.useState('');
    const [billingBairro, setBillingBairro] = React.useState('');
    const [billingCity, setBillingCity] = React.useState('');
    const [billingState, setBillingState] = React.useState('');
    const [numberAddressBilling, setNumberAddressBilling] = React.useState('');
    const [billingCep, setBillingCep] = React.useState('');
    const [billingAddress, setBillingAddress] = React.useState('');

    //Pay address
    const [payStreet, setPayStreet] = React.useState('');
    const [payBairro, setPayBairro] = React.useState('');
    const [payCity, setPayCity] = React.useState('');
    const [payState, setPayState] = React.useState('');
    const [numberAddressPay, setNumberAddressPay] = React.useState('');
    const [payCep, setPayCep] = React.useState('');

    const [errorData, setErrorData] = React.useState('');


    /* Busca CEP 01*/
    async function buscaCep(cep: string){
        const url_fetch = fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET',
        })
        const response = await url_fetch;
        const json = await response.json();
        console.log(json)
        const faixaCep = (json.cep).split('-', 1);
            setPayStreet(json.logradouro);
            setPayCity(json.localidade);
            setPayState(json.uf)
            setPayBairro(json.bairro)
        
    }

    /* Busca CEP 02*/
    async function buscaCep2(cep: string){
        const url_fetch = fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET',
        })
        const response = await url_fetch;
        const json = await response.json();
        console.log(json)
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
        if(cnpj.validate() && razaoSocial && fantasyName
            && email_company.value && numberAddressPay && numberAddressBilling){
            const { url, options } = CREATE_DOCUMENT({
                "document": {
                    "path": "/modelos/teste.docx",
                    "template": {
                        "data": {
                        "fantasy_name": fantasyName.value,
                        "address_pay": `Rua ${payStreet}, ${payBairro}, ${payCity}, ${payState}, N°${numberAddressPay}`, 
                        "address_billing": `Rua ${billingStreet}, ${billingBairro}, ${billingCity}, ${billingState} N°${numberAddressBilling}`,
                        "contact": email_company.value,
                        "business_email": email_company.value,
                        "total_days": totalDays,
                        "initial_date": dataAtualFormatada(startDate),
                        "final_date": dataAtualFormatada(endDate),
                        "cnpj": cnpj.value,
                        "billing": billing.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                        "total": (price + billing).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                        "machine_name": "Ecolift-50",
                        "code_contract": Math.floor(Math.random()*650),
                        "price_product": price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
                        "phone_number": tel_company.value
                        }
                    },
                }
            })
            const  { key } = await request(url, options);
            setKeyDocument(key);
            sendLead();
        }else{
            setErrorData('Preencha todos os campos obrigatórios.')
        }
         
    }
        

    const createDocumentKey = async (keySign: string) =>{
            const fetchDocumentKey = fetch('https://nest-rental-backend-api.herokuapp.com/create-document', {
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
            window.localStorage.setItem('document_key', key)
            setKeyDocumentSign(key);
            
        }      
    


    const createSignerDocument = async (e: React.FormEvent<HTMLInputElement>) =>{
        e.preventDefault();
        if(cpfUser && email_user.value && dateBirthday && nameUser && tel_user.value){
            if(!keyDocumentSign){
                const { url, options } = CREATE_DOCUMENT_SIGNER({
                    "signer": {
                        "email": email_user.value,
                        "phone_number": tel_user.value,
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

    



    
    const sendLead = async () =>{
        const teste = fetch('https://nest-rental-backend-api.herokuapp.com/send-lead', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "data": [
                    {
                        "Company": fantasyName.value,
                        "Last_Name": fantasyName.value,
                        "First_Name": fantasyName.value,
                        "Email": email_company,
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
                    ]
                })
        })
        const response = await teste;
        const json = await response.json();
        console.log(json)
    }
    
    


    function formataCPF(cpf: string){
        //retira os caracteres indesejados...
        cpf = cpf.replace(/[^\d]/g, "");
        
        //realizar a formatação...
          setCpfUser(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
      }

      const maskPhone = (tel: string) => {
        return tel
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
      };




      React.useEffect(()=>{
        formataCPF(cpfUser)
      }, [cpfUser])

      React.useEffect(()=>{
        buscaCep(payCep);
      }, [payCep])

      React.useEffect(()=>{
        buscaCep2(billingCep);
      }, [billingCep])




    return(

        <>
        {loading && 
            <Loading/>
        }
            <Header/>
      
            <section style={{
                backgroundColor: "#125082",
                width: '100%',
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

    {!keyDocument && <section className={styles.divCheckout}>
            <form className={styles.formCheckout}>
                <input type="text" id="total_days" name="total_days" value={totalDays} style={{display: 'none'}}/>
                <input type="text" id="billing" name="billing" value={billing} style={{display: 'none'}}/>
                <input type="text" id="total" name="total" value={price? price: newPrice} style={{display: 'none'}}/>
                <input type="text" id="address_pay" name="address_pay" value={`${street}, ${bairro}, ${country}, ${number}`} style={{display: 'none'}}/>

                

                <div className={styles.formCheckout__div}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Title level={3}>
                        Empresa
                        </Title>
                        <div>
                            <p style={{color: 'rgba(18, 80,130)', fontWeight: '600'}}>Já possui cadastro? <Link to="/login" style={{fontWeight: 'bold', textDecoration: 'none', color: 'rgba(18, 80,130)', fontSize: '1.1rem'}}>Faça Login</Link></p>
                            
                        </div>
                    </div>
                    
                    <Input
                        type="text"
                        label="Razão social"
                        name="razao_social"
                        id="razao_social"
                        placeholder="Digite sua razão social"
                        {...razaoSocial}
                    />

                    <div className={styles.formCheckout__div__inputs}> 
                        <Input
                            type="text"
                            label="Nome fantasia*"
                            name="fantasy_name"
                            id="fantasy_name"
                            placeholder="Digite seu nome fantasia"
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

                    <div className={styles.formCheckout__div__inputs}>
                        <div style={{width:"100%"}}>
                            <Input
                                type="text"
                                label="Inscrição Estadual*"
                                name="insc_estadual"
                                id="insc_estadual"
                                placeholder="xx.xxx.xxx-x"
                                {...insc_estadual}
                            />
                        </div>
                        <div style={{width:"100%"}}>
                            <Input
                                type="email"
                                label="Email*"
                                name="email_company"
                                id="email_company"
                                placeholder="emailexample@com.br"
                                {...email_company}
                            />
                        </div>
                    </div>
                    
                    
                </div>

                {/* DETALHES DO FATURAMENTO*/}

                

                <div className={styles.formCheckout__div}>
                    <Title level={3}>
                        Detalhes do faturamento
                    </Title>
                    <div className={styles.formCheckout__div__inputs}>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block"}}>CEP</label>
                            <input 
                                type="number" 
                                id="" 
                                name="" 
                                pattern="[0-9]+"
                                placeholder="Digite seu CEP"
                                onChange={(e)=>setPayCep(e.target.value)}
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label>Rua/Av*</label>
                            <input 
                                type="text" 
                                id="street" 
                                name="street" 
                                placeholder="Digite sua rua ou avenida"
                                onChange={(e)=>setPayStreet(e.target.value)}
                                value={payStreet}
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label>Número*</label>
                            <input 
                                type="number" 
                                id="number" 
                                placeholder="Digite o número"
                                name="number"
                                onChange={(e)=>setNumberAddressPay(e.target.value)}
                                value={numberAddressPay}
                            />
                        </div>
                    </div>

                    <div className={styles.formCheckout__div__inputs}>
                        <div >
                            <label>Cidade*</label>
                            <input 
                                type="text" 
                                id="country" 
                                placeholder="Digite sua cidade"
                                name="country" 
                                onChange={(e)=>setPayCity(e.target.value)}
                                value={payCity}
                            
                            />
                        </div>

                        <div>
                            <label>UF*</label>
                            <input 
                                type="text" 
                                id="" 
                                placeholder="Digite seu estado"
                                name="" 
                                onChange={(e)=>setPayState(e.target.value)}
                                value={payState}
                            />
                        </div>

                        <div>
                            <label>Bairro*</label>
                            <input 
                                type="text" 
                                id="bairro" 
                                placeholder="Digite seu bairro"
                                name="bairro" 
                                onChange={(e)=>setPayBairro(e.target.value)}
                                value={payBairro}
                            />
                        </div>
                        <div>
                            <label>Complemento</label>
                            <input 
                                type="text" 
                                id="" 
                                name=""
                                placeholder="Digite um complemento"
                            />
                        </div>
                    
                    </div>
                </div>
            

                

                <div className={styles.formCheckout__div}>
                    <Title level={3}>
                        Detalhes de entrega
                    </Title>
                    <div className={styles.formCheckout__div__inputs}>
                            <div style={{width:"100%"}}>
                                <label>Nome(responsável por receber):*</label>
                                <input 
                                    type="text" 
                                    id="" 
                                    name="" 
                                    placeholder="Digite o nome do responsável"
                                />
                            </div>
                            <div style={{width:"100%"}}>
                                <Input
                                    type="text"
                                    label="Telefone*"
                                    name="tel_company"
                                    id="tel_company"
                                    placeholder="(00) 000000000"
                                    {...tel_company}
                                />
                            </div>
                        </div>
                    <div className={styles.formCheckout__div__inputs}>
                        <div style={{width:"100%"}}>
                            <label>CEP*</label>
                            <input 
                                type="number" 
                                id="" 
                                name="" 
                                pattern="[0-9]+"
                                placeholder="Digite seu CEP"
                                onChange={(e)=>setBillingCep(e.target.value)}
                            />
                        </div>
                        <div style={{width:"100%"}}>
                            <label>Rua/Av*</label>
                            <input 
                                type="text" 
                                placeholder="Digite sua rua ou avenida"
                                id="street" 
                                name="street" 
                                onChange={(e)=>setBillingStreet(e.target.value)}
                                value={billingAddress}
                             
                            />
                        </div>
                        <div style={{width:"100%"}}>
                            <label>Número*</label>
                            <input 
                                type="number" 
                                id="number" 
                                name="number"
                                placeholder="Digite o número"
                                onChange={(e)=>setNumberAddressBilling(e.target.value)}
                                
                            />
                        </div>
                    </div>

                    <div className={styles.formCheckout__div__inputs}>
                        <div>
                            <label>Cidade*</label>
                            <input 
                                type="text" 
                                id="country" 
                                placeholder="Digite sua cidade"
                                name="country" 
                                onChange={(e)=>setBillingCity(e.target.value)}
                                value={billingCity}
                               
                            />
                        </div>

                        <div>
                            <label>UF*</label>
                            <input 
                                type="text" 
                                id="" 
                                name="" 
                                placeholder="Digite seu estado"
                                onChange={(e)=>setBillingState(e.target.value)}
                                value={billingState}
                              
                            />
                        </div>
                        <div>
                            <label>Bairro*</label>
                            <input 
                                type="text" 
                                id="bairro" 
                                name="bairro" 
                                placeholder="Digite seu bairro"
                                onChange={(e)=>setBillingBairro(e.target.value)}
                                value={billingBairro}
                                
                            />
                        </div>
                        <div>
                            <label>Complemento</label>
                            <input 
                                type="text" 

                                id="" 
                                placeholder="Digite um complemento"
                                name=""
                            />
                        </div>
                    </div>
                </div>
            </form>

        {/***********************************************************/}
        <div className={styles.formCheckout__div2}>
            <Title>Resumo do pedido</Title>
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
                    backgroundColor: "#44963b",
                    color: "#fff",
                    width: "100%", 
                    padding: "1rem",
                    borderRadius: "9px",
                    border: "none",
                    marginTop: "1rem",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    cursor: "pointer",
                    boxShadow: "1px 10px 15px 2px #ccc"
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
                    Dados do contratante
                </Title>
            </div>
            <section style={{display: 'flex', justifyContent: 'space-between'}}>
                <form style={{marginLeft: "5rem"}}>
                    <div style={{
                        width: '100%',
                        marginTop: '1rem',
                        background: "#f1f1f1",
                        padding: '1rem 1rem',
                        borderRadius: '8px'

                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem  0',
                            gap: '1rem'
                        }}>
                            <div>
                                <label style={{display: "block"}}>Nome*</label>
                                <input 
                                    type="text"
                                    id="name_user"
                                    name="name_user"
                                    onChange={(e)=>setNameUser(e.target.value)}
                                    placeholder="Digite seu nome"
                                    style={{
                                        width: '100%',
                                        border: '1px solid #ccc',
                                        padding: '.5rem .5rem',
                                        background: 'transparent',
                                        borderRadius:'8px' 

                                    }}
                                />
                            </div>
                        
                            <div>
                                <label  style={{display: "block"}}>CPF*</label>
                                <input 
                                    type="text"
                                    id="cpf_user"
                                    name="cpf_user"
                                    placeholder="000.000.000-00"
                                    onChange={(e)=>setCpfUser(e.target.value)}
                                    value={cpfUser}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #ccc',
                                        padding: '.5rem .5rem',
                                        background: 'transparent',
                                        borderRadius:'8px' 

                                    }}
                                />
                            </div>
                            
                            <div>
                                <label  style={{display: "block"}}>Data de nascimento*</label>
                                <input 
                                    type="date"
                                    id="date_birthday"
                                    name="date_birthday"
                                    onChange={(e)=>setDateBirthday(e.target.value)}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #ccc',
                                        padding: '.5rem .5rem',
                                        background: 'transparent',
                                        borderRadius:'8px' 

                                    }}
                                />
                            </div>
                    
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 0', gap: '1rem'}}>
                        <div style={{width: '100%'}}>
                            <Input
                                type="email"
                                label="Email*"
                                name="email_user"
                                id="email_user"
                                placeholder="emailexample@com.br"
                                {...email_user}
                            />
                        </div>
                        <div style={{width: '100%'}}>
        
                                <Input
                                    type="text"
                                    label="Telefone*"
                                    name="tel_user"
                                    id="tel_user"
                                    placeholder="(00) 000000000"
                                    {...tel_user}
                                />
                        </div>
                        </div>
                    </div>
                    {errorData && <p style={{color: 'red', textAlign: 'left', paddingTop: '.5rem', fontSize: '.7rem'}}>{errorData}</p>}
                </form>

            <div style={{
                backgroundColor: "#f1f1f1",
                width: "auto",
                borderRadius: "1rem",
                padding: "2rem 2rem 2rem 2rem",
                height: "40%"
            }}>
                <form >
                    <div style={{
                        display: "flex",
                        gridGap: "2rem",
                        width: "100%",
                        color: 'rgb(18, 80, 130)'
                    }}>
                        <div style={{width: "100%"}}>
                            <label htmlFor="start" style={{display: 'block', fontWeight: '600'}}>início</label>
                            <input type="date" name="start" value={startDate} disabled 
                                style={{
                                    width: "100%",
                                    border: 'none',
                                    padding: '.5rem .5rem',
                                    background: '#c2c2c2',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="end" style={{display: 'block', fontWeight: '600'}}>Devolução</label>
                            <input type="date" name="end" value={endDate} disabled
                                style={{
                                    width: "100%",
                                    border: 'none',
                                    padding: '.5rem .5rem',
                                    background: '#c2c2c2',
                                    borderRadius: '8px'
                                }}
                            />
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
                        backgroundColor: "#44963b",
                        color: "#fff",
                        width: "100%", 
                        padding: "1rem",
                        borderRadius: "9px",
                        border: "none",
                        marginTop: "1rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "1px 10px 15px 2px #ccc"
                    }}
                        value="Gerar contrato"
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
<Footer/>
    
</>
    );
}
