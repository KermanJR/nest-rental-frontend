import React from "react";
import styles from './Checkout.module.scss';
import { checkContext } from "../../context/CheckoutContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_POST } from "../../api/Zoho/ApiZoho";
import { useFetch } from "../../hooks/useFetch";
import { Title } from "../../components/Title/Title";
import { isNullishCoalesce } from "typescript";







export const Checkout = () =>{

    const navigate = useNavigate();
    const { request, error, data} = useFetch();

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
    const [loading, setLoading] = React.useState(false);



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
        setLoading(false)
        try{
            setLoading(true)
            let fetchGenerateDocument = fetch('https://nestrental-back.herokuapp.com/create-model', {
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
            let response = await fetchGenerateDocument;
            let json = await response.json();
            window.localStorage.setItem('key_signature', '')
         
                console.log(json);
                setSignKey(json.request_signature_key);
                //window.localStorage.setItem('key_signature', json.request_signature_key);
                //setLoading(false)

                //Envia lead para o Zoho CRM
                sendLead();

                //Navega para a página de contrato
                navigate('/contrato', {
                    state: {
                        token: json.request_signature_key
                    }
                });
            
            
            
            
        }catch(err){
            console.log(err);
        }
    }

    //window.localStorage.setItem('access_token', '');

    const getTokenAuthorization = async () =>{

            try{
                let fetchGenerateToken = fetch('https://nestrental-back.herokuapp.com/generate-token', {
                    method: 'POST'
                })
                let response = await fetchGenerateToken;
                let json = await response.json();
                console.log(json);
                window.localStorage.setItem('access_token', json.access_token);
                setTokenAuth(json.message);
            }catch(error){
                console.log(error);
            }
        
        
    }


    
    /*const refreshToken = async ()=>{
        let tkn = window.localStorage.getItem('access_token');
        if(tkn != undefined || tkn !== null){
            try{
                const teste = fetch('http://localhost:6800/refresh-token', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },body: JSON.stringify({
                        "tkn": tkn
                    })
                    
                })
                const response = await teste;
                const json = await response.json();
                setTokenAuth(json.tkn);
            }catch(err){
                console.log(err)
            }
        }else{
            console.log('Deu ruim')
        }
    }*/

    

    const sendLead = async () =>{
        let wtoken = window.localStorage.getItem('access_token');
        if(wtoken != ''){
            try{
                const teste = fetch('https://nestrental-back.herokuapp.com/send-lead', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },body: JSON.stringify({
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
                      })
                })
                const response = await teste;
                const json = await response.json();
                console.log(json)
                
            }catch(err){
                console.log(err)
            }
        }
    }

    

    React.useEffect(()=>{
        buscaCep();
    }, [billingCep])

    React.useEffect(()=>{
        getTokenAuthorization();
        //refreshToken();
    }, [])


   

    return(

        <>
        {loading && 
        <div className="loader loader--style1" title="0" style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            textAlign: 'center',
            display: 'flex',
            top: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, .5)'
        }}>
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xmlSpace="preserve" style={{
                position: 'relative',
                top: 0,
                left: 0
             }}>
            <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
              s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
              c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
            <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
              C22.32,8.481,24.301,9.057,26.013,10.047z">
              <animateTransform attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="0.5s"
                repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
          
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
