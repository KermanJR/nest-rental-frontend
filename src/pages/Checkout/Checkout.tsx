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







export const Checkout = () =>{

    const { request, error, data, loading} = useFetch();



    const razaoSocial = useForm('');
    const fantasyName = useForm('');
    const cnpj = useForm('cnpj');
    const insc_estadual = useForm('insc_estadual');

 
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
        if(cnpj.validate() && razaoSocial && fantasyName
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
            sendLead();
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
            window.localStorage.setItem('document_key', key)
            setKeyDocumentSign(key);
            
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

    



    
    const sendLead = async () =>{
        const teste = fetch('https://nestrental-back.herokuapp.com/send-lead', {
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
                    ]
                })
        })
        const response = await teste;
        const json = await response.json();
        console.log(json)
    }
    
    

    React.useEffect(()=>{
        buscaCep();
    }, [billingCep])

    function formataCPF(cpf: string){
        //retira os caracteres indesejados...
        cpf = cpf.replace(/[^\d]/g, "");
        
        //realizar a formatação...
          setCpfUser(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
      }

      React.useEffect(()=>{
        formataCPF(cpfUser)
      }, [cpfUser])


    return(

        <>
        {loading && 
            <Loading/>
        }
      
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

                <h3 className={styles.formCheckout__title}>Empresa</h3>

                <div className={styles.formCheckout__div}>
                    <Input
                        type="text"
                        label="Razão social"
                        name="razao_social"
                        id="razao_social"
                        placeholder="Digite aqui"
                        {...razaoSocial}
                    />

                    <div className={styles.formCheckout__div__inputs}> 
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
                            <label>Email*</label>
                            <input 
                                type="email" 
                                id="business_email" 
                                name="business_email"
                                placeholder="Digite aqui"
                                required
                                onChange={(e)=>setBusinessEmail(e.target.value)}
                                style={{width:"100%"}}
                            />
                        </div>
                    </div>
                    
                    
                </div>

                {/* DETALHES DO FATURAMENTO*/}

                <Title level={3}>
                    Detalhes do faturamento
                </Title>

                <div className={styles.formCheckout__div}>
                    <div className={styles.formCheckout__div__inputs}>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block"}}>CEP</label>
                            <input 
                                type="text" 
                                id="" 
                                name="" 
                                defaultValue={cep}
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label>Rua/Av*</label>
                            <input 
                                type="text" 
                                id="street" 
                                name="street" 
                                value={street}
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label>Número*</label>
                            <input 
                                type="text" 
                                id="number" 
                                placeholder=""
                                name="number"
                                onChange={(e)=>setNumberAddressPay(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.formCheckout__div__inputs}>
                        <div>
                            <label>Cidade*</label>
                            <input 
                                type="text" 
                                id="country" 
                                name="country" 
                                value={country}
                            />
                        </div>

                        <div>
                            <label>UF*</label>
                            <input 
                                type="text" 
                                id="" 
                                name="" 
                                defaultValue={state}
                            />
                        </div>

                        <div>
                            <label>Bairro*</label>
                            <input 
                                type="text" 
                                id="bairro" 
                                name="bairro" 
                                value={bairro}
                            />
                        </div>
                        <div>
                            <label>Complemento</label>
                            <input 
                                type="text" 
                                id="" 
                                name=""
                                placeholder=""
                            />
                        </div>
                    
                    </div>
                </div>
            

                <Title level={3}>
                    Detalhes de entrega
                </Title>

                <div className={styles.formCheckout__div}>
                    <div className={styles.formCheckout__div__inputs}>
                            <div style={{width:"100%"}}>
                                <label>Nome(responsável por receber):*</label>
                                <input 
                                    type="text" 
                                    id="" 
                                    name="" 
                                    placeholder="Digite aqui"
                                />
                            </div>
                            <div style={{width:"100%"}}>
                                <label>Telefone*</label>
                                <input 
                                    type="text" 
                                    id="" 
                                    name="" 
                                />
                            </div>
                        </div>
                    <div className={styles.formCheckout__div__inputs}>
                        <div style={{width:"100%"}}>
                            <label>CEP*</label>
                            <input 
                                type="text" 
                                id="" 
                                name="" 
                                placeholder="Digite seu CEP"
                                onChange={(e)=>setBillingCep(e.target.value)}
                            />
                        </div>
                        <div style={{width:"100%"}}>
                            <label>Rua/Av*</label>
                            <input 
                                type="text" 
                                id="street" 
                                name="street" 
                                onChange={(e)=>setBillingStreet(e.target.value)}
                                value={billingStreet}
                            />
                        </div>
                        <div style={{width:"100%"}}>
                            <label>Número*</label>
                            <input 
                                type="text" 
                                id="number" 
                                name="number"
                                placeholder=""
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
                                onChange={(e)=>setBillingState(e.target.value)}
                                defaultValue={billingState}
                            />
                        </div>
                        <div>
                            <label>Bairro*</label>
                            <input 
                                type="text" 
                                id="bairro" 
                                name="bairro" 
                                onChange={(e)=>setBillingBairro(e.target.value)}
                                value={billingBairro}
                            />
                        </div>
                        <div>
                            <label>Complemento</label>
                            <input 
                                type="text" 
                                id="" 
                                placeholder=""
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
                            <label  style={{display: "block"}}>E-mail*</label>
                            <input 
                                type="text" 
                                id="email_user" 
                                name="email_user"
                                required
                                onChange={(e)=>setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    padding: '.5rem .5rem',
                                    background: 'transparent',
                                    borderRadius:'8px' 

                                }}
                                placeholder=""
                            />
                        </div>
                        <div style={{width: '100%'}}>
                            <label  style={{display: "block"}}>Telefone*</label>
                            <input 
                                type="text" 
                                id="contact" 
                                name="contact"
                                placeholder="(00) 000000000"
                                onChange={(e)=>setContact(e.target.value)}
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

    
</>
    );
}
