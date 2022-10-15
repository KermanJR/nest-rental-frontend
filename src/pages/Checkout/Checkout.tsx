import React, { useEffect } from "react";
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
import { api } from "src/api/api";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/UserContext";
import SearchCep from "src/helpers/SearchCep";



export const Checkout = () => {

    const { request, error, data, loading } = useFetch();

    const razaoSocial = useForm('');
    const fantasyName = useForm('');
    const cnpj = useForm('cnpj');
    const insc_estadual = useForm('insc_estadual');
    const email_company = useForm('email')
    const email_user = useForm('email');
    const tel_company = useForm('telefone');
    const tel_user = useForm('telefone');
    const passwordClient = useForm('password')


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


    //Billing address (endereço de cobrança)
    const [billingStreet, setBillingStreet] = React.useState('');
    const [billingNeighbourhood, setBillingNeighbourhood] = React.useState('');
    const [billingCity, setBillingCity] = React.useState('');
    const [billingState, setBillingState] = React.useState('');
    const [numberAddressBilling, setNumberAddressBilling] = React.useState('');
    const [billingCep, setBillingCep] = React.useState('');
    const [billingAddress, setBillingAddress] = React.useState('');

    //Shipping address (endereço de entrega)
    const [shippingStreet, setShippingStreet] = React.useState('');
    const [shippingNeighbourhood, setShippingNeighbourhood] = React.useState('');
    const [shippingCity, setShippingCity] = React.useState('');
    const [shippingState, setShippingState] = React.useState('');
    const [numberAddressShipping, setNumberAddressShipping] = React.useState('');
    const [shippingAddress, setShippingAddress] = React.useState('');
    const [shippingCep, setShippingCep] = React.useState('');


    const [nameResp, setNameResp] = React.useState('');
    const [errorData, setErrorData] = React.useState('');


    /* Busca CEP 01*/
    async function buscaCepBilling(cep: string) {
        const json = await SearchCep(cep);
        const faixaCep = (json.cep).split('-', 1);
        setBillingStreet(json.logradouro);
        setBillingCity(json.localidade);
        setBillingState(json.uf)
        setBillingNeighbourhood(json.bairro)

    }

    /* Busca CEP 02*/
    async function buscaCepShipping(cep: string) {
        const json = await SearchCep(cep);
        const faixaCep = (json.cep).split('-', 1);
        setShippingStreet(json.logradouro);
        setShippingNeighbourhood(json.bairro);
        setShippingCity(json.localidade)
        setShippingState(json.uf);
        setShippingAddress(json.logradouro + ', ' + json.bairro + ', ' + json.localidade)

    }

    const {
        totalDays,
        billing,
        price,
        newPrice,
        startDate,
        endDate,
    } = useContext(checkContext);

    


  
    function dataAtualFormatada(date: string) {
        var data = new Date(date),
            dia = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes,
            anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;
    }


    //Cria modelo do documento
    const createModelDocument = async () => {
        if (cnpj.validate() && razaoSocial && fantasyName
            && email_company.value && numberAddressShipping && numberAddressBilling) {
            const { url, options } = CREATE_DOCUMENT({
                "document": {
                    "path": "/modelos/teste.docx",
                    "template": {
                        "data": {
                            "fantasy_name": fantasyName.value,
                            "address_pay": `Rua ${billingStreet}, ${billingNeighbourhood}, ${billingCity}, ${billingState}, N°${numberAddressBilling}`,
                            "address_billing": `Rua ${shippingStreet}, ${shippingNeighbourhood}, ${shippingCity}, ${shippingState} N°${numberAddressShipping}`,
                            "contact": email_company.value,
                            "business_email": email_company.value,
                            "total_days": totalDays,
                            "initial_date": dataAtualFormatada(startDate),
                            "final_date": dataAtualFormatada(endDate),
                            "cnpj": cnpj.value,
                            "billing": billing.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
                            "total": (price + billing).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
                            "machine_name": "Ecolift-50",
                            "code_contract": Math.floor(Math.random() * 650),
                            "price_product": price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
                            "phone_number": tel_company.value
                        }
                    },
                }
            })
            const { key } = await request(url, options);
            setKeyDocument(key);
            //sendLead();
        } else {
            setErrorData('Preencha todos os campos obrigatórios.')
        }

    }


    //Cria documento e retorna sua chave
    const createDocumentKey = async (keySign: string) => {
        const fetchDocumentKey = fetch('https://nest-rental-backend-api.herokuapp.com/create-document', {
            method: 'POST',
            headers: {
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



    //Cria signatário do documento
    const createSignerDocument = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (cpfUser && email_user.value && dateBirthday && nameUser && tel_user.value) {
            if (!keyDocumentSign) {
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
                const { key } = await request(url, options);
                setKeySigner(key);
                setTimeout(() => {
                    createDocumentKey(key);
                }, 5000)
            } else {
                setErrorData('Este contrato já foi gerado...')
            }
        } else {
            setErrorData('Preencha todos os campos obrigatórios.')
        }
    }

    const {
        usuario 
    } = useContext(UserContext);


    //Carrega dados de usuário que já está logado.
    async function carregar_usuario_logado() {
        const id_usuario = usuario?.id;
        const { data } = await api.get(`/usuarios/${id_usuario}`);
        const {
            razao_social,
            inscricao_estadual,
            nome_fantasia,
            nome,
            email,
            documento
        } = data.entidade;

        cnpj.setValue(documento);
        razaoSocial.setValue(razao_social);
        email_company.setValue(email);
        fantasyName.setValue(nome_fantasia);
        insc_estadual.setValue(inscricao_estadual);
    }

    async function carregar_endereco() {
        const id_usuario = usuario?.id;
        const { data } = await api.get(`/enderecos`);
        const endereco_entrega = data.find(e => e.tipo == "E");
        setShippingCep(endereco_entrega.cep);
        setShippingNeighbourhood(endereco_entrega.bairro);
        setShippingStreet(endereco_entrega.rua);
        setNumberAddressShipping(endereco_entrega.numero);

        const endereco_cobranca = data.find(e => e.tipo == "C");

        setBillingCep(endereco_cobranca.cep);
        setBillingNeighbourhood(endereco_cobranca.bairro);
        setBillingStreet(endereco_cobranca.rua);
        setNumberAddressBilling(endereco_cobranca.numero);
    }

    useEffect(()=>{
        carregar_usuario_logado();
    }, []);

    async function criar_usuario() {
        const { data } = await api.post("/usuarios", {
            "nome": "???",
            "documento": cnpj.value,
            "tipo": "J",
            "razao_social": razaoSocial.value,
            "email": email_company.value,
            "nome_fantasia": fantasyName.value,
            "inscricao_estadual": insc_estadual.value,
            "login": email_company.value,
            "password": passwordClient.value,
            "id_perfil": 2,
        });

        return data;
    }


    async function buscar_cidade(nome_cidade: string) {
        //Considerando apenas cidades de sao paulo.
        const nome = encodeURI(nome_cidade);
        const { data } = await api.get(`/cidades/${nome}`);

        return data?.id;
    }

    async function criar_endereco_cobranca(id_entidade) {
        const { data } = await api.post(`/enderecos/${id_entidade}`, {
            "id_cidade": await buscar_cidade(billingCity),
            "cep": billingCep,
            "bairro": billingNeighbourhood,
            "complemento": "???",
            "rua": billingStreet,
            "numero": numberAddressBilling,
            "contato": "???",
            "telefone": "???",
            "email": email_company.value,
            "nome_obra": "???",
            tipo: "C" //E = Entrega C = Cobrança
        });

        return data;
    }

    async function criar_endereco_entrega(id_entidade) {
        const { data } = await api.post(`/enderecos/${id_entidade}`, {
            "id_cidade": await buscar_cidade(billingCity),
            "cep": shippingCep,
            "bairro": shippingNeighbourhood,
            "complemento": "???",
            "rua": shippingStreet,
            "numero": numberAddressShipping,
            "contato": "???",
            "telefone": tel_user.value,
            "email": email_company.value,
            "nome_obra": "???",
            tipo: "E" //E = Entrega C = Cobrança
        });

        return data;
    }

    async function criar_pedido(id_endereco, id_usuario, id_entidade) {
        const total = (newPrice || price) + billing;
        const id_produto = 1;

        const { data } = await api.post(`/pedidos`, {
            "descricao": "????",
            "data_inicio": startDate,
            "data_entrega": endDate,
            "vr_total": total,
            "id_endereco": id_endereco,
            "id_cupom_desconto": null,
            "id_cliente": id_entidade,
            "id_usuario": id_usuario,
            "itens": [
                {
                    "id_produto": id_produto,
                    "valor": total,
                    "vr_desconto": 0,
                    "quantidade": 1
                },
            ]
        });

        return data;
    }


    async function salvar() {
        try {
            let entidade_id, user_id;

            if(usuario == null){
                const { entidade, user } = await criar_usuario();
                entidade_id = entidade.id;
                user_id = user.id;
            }else{
                entidade_id = usuario.id_entidade;
                user_id = usuario.id;
            }
            
            const { endereco } = await criar_endereco_cobranca(entidade_id);
            const { endereco: endereco_entrega } = await criar_endereco_entrega(entidade_id);
            const pedido = await criar_pedido(endereco, user_id, entidade_id);
           // createModelDocument()
        } catch (err) {
            alert(
                JSON.stringify(err?.response?.data || err, null, 3)
            );
            console.log(err?.response?.data || err);
        }
    }


    const [idAccount, setIdAccount] = React.useState(null);
    const [errorCreateLeadZoho, setErrorCreateLeadZoho] = React.useState<string>('');

    //Envia QUOTE para o ZOHO CRM 
    const sendQuote = async (idAccount: any) => {
        const teste = fetch('https://nest-rental-backend-api.herokuapp.com/send-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "data": [
                            {
                                "Owner": {   
                                    "name": "Tatiana Tavora Dias",
                                    "id": "702098344",
                                    "email": "tdias@nestrental.com.br"
                                },

                                //settings
                                "$currency_symbol": "BRL", 
                                "Currency": "BRL",
                                "Adjustment": 0,             
                                "$editable": true, 
                                "Tax": 0, 
                                

                                //billing address
                                "Billing_Country": "Brasil",
                                "Billing_Street": billingStreet,  
                                "Billing_Code": billingCep, 
                                "Billing_City": billingCity,   
                                "Billing_State": billingState,

                                //shipping address
                                "Shipping_Country": "Brasil",             
                                "Shipping_Code": shippingCep,  
                                "Shipping_Street": shippingStreet,  
                                "Shipping_State": shippingState,  
                                "Shipping_City": shippingCity,
                                
          
                                "Carrier": "Nest Rental", 
                                "Grand_Total": 9785,    

                                "$approval": {                
                                    "delegate": false,                
                                    "approve": false,                
                                    "reject": false,                
                                    "resubmit": false
                                },

                            "Product_Details": [ 
                                {
                                    "product": {
                                        "Product_Code": null,                                        
                                        "Currency": "BRL",
                                        "name": "sample",
                                        "id": "4288853000019876145"
                                    },
                                    
                                    "quantity": 1,                  
                                    "Discount": 0,                    
                                    "total_after_discount": newPrice+billing,                    
                                    "net_total": 0,                    
                                    "book": null,                    
                                    "Tax": 0,                    
                                    "list_price": 0,                    
                                    "unit_price": null,                   
                                    "quantity_in_stock": -1,                    
                                    "total": newPrice+billing,                    
                                    "id": "4288853000019876145",
                                    "product_description": produto?.descricao,                    
                                    "line_tax": []
                                }
                            ],
               
                            "Discount": 0,              
                            "Description": produto?.descricao,             
                            

                            "$review_process": { 
                                "approve": false,
                                "reject": false,
                                "resubmit": false
                            },
                
                            "$review": null, 
                            "Valid_Till": null, 
                            
                            "Account_Name": { 
                                "name": razaoSocial.value,
                                "id": idAccount
                            },
                            
                            "Quote_Stage": "Pendente", 
                            "Terms_and_Conditions": null, 
                            "Sub_Total": price+billing, 
                            "Subject": "Locação", 
                            "$orchestration": false, 
                            "Contact_Name": null, 
                            "$in_merge": false,
                            "$line_tax": [], 
                            "Tag": []
    
                        }
                    ]
                })
            })
        const response = await teste;
        const json = await response.json();
        createModelDocument();
    }


    //Envia LEAD para o ZOHO CRM ---- AQUI se centralizará a criação de conta na zoho e banco de dados
    const sendLead = async (e: any) => {
        e.preventDefault()
        const teste = fetch('https://nest-rental-backend-api.herokuapp.com/send-lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "data": [
                    {
                        "Owner": { //Name, ID, and email of the owner of the Account
                            "name": "Tatiana Tavora Dias",
                            "id": "702098344",
                            "email": "tdias@nestrental.com.br"
                        },

                        "Inscri_o_Estadual": insc_estadual.value,
                        "CNPJ": cnpj.value,
                        "Raz_o_Social": razaoSocial.value,
                        "Phone": tel_user.value,
                        "Origem_prospect": "E-commerce", 
                        "$currency_symbol": "BRL",  //The currency in which the revenue is generated 
                        "Account_Type": "Lead", //Represents the type of account
                        "Industry": "Instaladoras", //The name of the industry of the account 
                        "Account_Site": "https://nest-rental-frontend.herokuapp.com", //The name of the account's location, for example, Headquarters or London.
                        "$process_flow": false, //Represents if the record is a blueprint data
                        "Exchange_Rate": 3, //Represents of the currency in which the revenue is generated
                        "Currency": "BRL", //The symbol of the currency in which the revenue is generated
                        "Billing_Country": "Brasil", //The billing address of the account to send the quotes, invoices, and other agreements
                        "$approval": { //Represents if the current user can approve, delegate, reject, or resubmit the operations performed on this record
                            "delegate": false,
                            "approve": false,                         
                            "reject": false,
                            "resubmit": false
                        },
                        
                        "Billing_Street": billingStreet, //Represents the address details of the account
                        "$editable": true, //Represents if the user can edit records in the Accounts module
                        "Billing_Code": billingCep, //Represents the address details of the account
                        "Shipping_City": shippingCity, //Represents the address details of the account
                        "Shipping_Country": "Brasil", //Represents the address details of the account
                        "Shipping_Code": shippingCep, //Represents the address details of the account
                        "Billing_City": billingCity, //Represents the address details of the account

                        "Created_By": { //Name and ID of the user who created the record. This is a system-generated field. You cannot modify it.
                            "name": "Tatiana Tavora Dias",
                            "id": "702098344",
                            "email": "tdias@nestrental.com.br"
                        },
                        
                        "Shipping_Street": shippingStreet, //Represents the address details of the account
                        "Ownership": "Private", //Represents the ownership type of the account
                        "Rating": "Active", //Represents the rating of the account
                        "Shipping_State": "SP", //Represents the address details of the account

                        "$review_process": { //Represents the review process details of the account
                            "approve": false,
                            "reject": false,
                            "resubmit": false
                        },
                        
                        "Website": "https://nest-rental-frontend.herokuapp.com", //Represents the website of the account
                        "Account_Name": fantasyName.value, //Represents the name of the account

                        
                        "$in_merge": false,
                        "Contact_Details": [{

                        }], //Represents the details of contacts associated with the account
                        "Billing_State": billingState, //Represents the address details of the account
                        "Tag": [], //List of tags associated with the record

                        
                    }
                ]
                        
                    
                
            })
        })
        const response = await teste;
        const json = await response.json();
        if(json.message.data[0].code === 'SUCCESS'){
            sendQuote(json.message.data[0].details.id);
            salvar()
            createModelDocument()
        }else if(json.message.data[0].code === 'DUPLICATE_DATA' &&
                    json.message.data[0].details.api_name === 'CNPJ'
                ){
                    setErrorCreateLeadZoho('Este CNPJ já está associado a uma conta! Por favor, faça login.')
                }
    }

    



    function formataCPF(cpf: string) {
        //retira os caracteres indesejados...
        cpf = cpf.replace(/[^\d]/g, "");

        //realizar a formatação...
        setCpfUser(cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
    }


    const [produto, setProduto] = React.useState(null);

    async function carregar() {
        const { data } = await api.get(`/produtos/1`);
        setProduto(data)
      }





    React.useEffect(() => {
        formataCPF(cpfUser)
    }, [cpfUser])

    React.useEffect(() => {
        buscaCepBilling(billingCep);
    }, [billingCep])

    React.useEffect(() => {
        buscaCepShipping(shippingCep);
    }, [shippingCep])



    return (

        <>
            {loading &&
                <Loading />
            }
            <Header />

            <section style={{
                backgroundColor: "#125082",
                width: '100%',
                padding: "1rem 5rem",
                height: "150px",
                display: "flex",
                alignItems: "center"
            }}>
                <h1 style={{
                    color: "#fff",
                    textTransform: "uppercase"
                }}>Pedido</h1>
            </section>

            {!keyDocument && <section className={styles.divCheckout}>
                <form className={styles.formCheckout}>
                    <div className={styles.formCheckout__div}>
                        <div style={{
                            display: 'block',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>

                        
                                
                                    <Title level={3}>
                                        Empresa
                                    </Title>
                                    <p style={{ color: 'rgba(18, 80,130)', fontWeight: '600', textAlign: 'right' }}>Já possui cadastro?
                                        <Link to="/login?redirect=/checkout" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'rgba(18, 80,130)', fontSize: '1.1rem' }}> Faça Login</Link>
                                    </p>
                                    <Input
                                        type="text"
                                        label="Razão social"
                                        name="razao_social"
                                        id="razao_social"
                                        placeholder="Digite sua razão social"
                                        {...razaoSocial}
                                        disabled={usuario?true:false}
                                    />

                                    <div className={styles.formCheckout__div__inputs}>
                                        <Input
                                            type="text"
                                            label="Nome fantasia*"
                                            name="fantasy_name"
                                            id="fantasy_name"
                                            placeholder="Digite seu nome fantasia"
                                            {...fantasyName}
                                            disabled={usuario?true:false}
                                        />

                                        <Input
                                            type="text"
                                            label="CNPJ*"
                                            name="cnpj"
                                            id="cnpj"
                                            placeholder="xx.xxx.xxx/xxxx-xx"
                                            {...cnpj}
                                            disabled={usuario?true:false}
                                        />
                                    </div>

                                    <div className={styles.formCheckout__div__inputs}>
                                        <div style={{ width: "100%" }}>
                                            <Input
                                                type="text"
                                                label="Inscrição Estadual*"
                                                name="insc_estadual"
                                                id="insc_estadual"
                                                placeholder="xx.xxx.xxx-x"
                                                {...insc_estadual}
                                                disabled={usuario?true:false}
                                            />
                                        </div>
                                        <div style={{ width: "100%" }}>
                                            <Input
                                                type="email"
                                                label="Email*"
                                                name="email_company"
                                                id="email_company"
                                                placeholder="emailexample@com.br"
                                                {...email_company}
                                                disabled={usuario?true:false}
                                            />
                                        </div>
                                    </div>

                                {usuario ? <> </>: <Input
                                        type="password"
                                        label="Senha*"
                                        name="new_pass_client"
                                        id="new_pass_client"
                                        placeholder="Digite sua senha"
                                        {...passwordClient}
                                        disabled={usuario?true:false}
                                    />  }
                                             
                        
                        </div>
                    </div>
                    
            
               
                    





                    {/* DETALHES DO FATURAMENTO*/}
                    <div className={styles.formCheckout__div}>
                        <Title level={3}>
                            Detalhes do faturamento
                        </Title>
                        <div className={styles.formCheckout__div__inputs}>
                            <div style={{ width: "100%" }}>
                                <label style={{ display: "block" }}>CEP</label>
                                <input
                                    type="number"
                                    id=""
                                    name=""
                                    pattern="[0-9]+"
                                    placeholder="Digite seu CEP"
                                    onChange={(e) => setBillingCep(e.target.value)}
                                    value={billingCep}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <label>Rua/Av*</label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    placeholder="Digite sua rua ou avenida"
                                    onChange={(e) => setBillingStreet(e.target.value)}
                                    value={billingStreet}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <label>Número*</label>
                                <input
                                    type="number"
                                    id="number"
                                    placeholder="Digite o número"
                                    name="number"
                                    onChange={(e) => setNumberAddressBilling(e.target.value)}
                                    value={numberAddressBilling}
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
                                    onChange={(e) => setBillingCity(e.target.value)}
                                    value={billingCity}

                                />
                            </div>

                            <div>
                                <label>UF*</label>
                                <input
                                    type="text"
                                    id=""
                                    placeholder="Digite seu estado"
                                    name=""
                                    onChange={(e) => setBillingState(e.target.value)}
                                    value={billingState}
                                />
                            </div>

                            <div>
                                <label>Bairro*</label>
                                <input
                                    type="text"
                                    id="bairro"
                                    placeholder="Digite seu bairro"
                                    name="bairro"
                                    onChange={(e) => setBillingNeighbourhood(e.target.value)}
                                    value={billingNeighbourhood}
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


                    {/*Detalhes de entrega*/}

                    <div className={styles.formCheckout__div}>
                        <Title level={3}>
                            Detalhes de entrega
                        </Title>
                        <div className={styles.formCheckout__div__inputs}>
                            <div style={{ width: "100%" }}>
                                <label>Nome(responsável por receber):*</label>
                                <input
                                    type="text"
                                    id=""
                                    name=""
                                    placeholder="Digite o nome do responsável"
                                    onChange={(e) => setNameResp(e.target.value)}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <Input
                                    type="text"
                                    label="Telefone*"
                                    name="tel_company"
                                    id="tel_company"
                                    placeholder="(00) 000000000"
                                    {...tel_user}
                                    disabled={false}
                                />
                            </div>
                        </div>
                        <div className={styles.formCheckout__div__inputs}>
                            <div style={{ width: "100%" }}>
                                <label>CEP*</label>
                                <input
                                    type="number"
                                    id=""
                                    name=""
                                    pattern="[0-9]+"
                                    placeholder="Digite seu CEP"
                                    onChange={(e) => setShippingCep(e.target.value)}
                                    value={shippingCep}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <label>Rua/Av*</label>
                                <input
                                    type="text"
                                    placeholder="Digite sua rua ou avenida"
                                    id="street"
                                    name="street"
                                    onChange={(e) => setShippingStreet(e.target.value)}
                                    value={shippingAddress}

                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <label>Número*</label>
                                <input
                                    type="number"
                                    id="number"
                                    name="number"
                                    placeholder="Digite o número"
                                    onChange={(e) => setNumberAddressShipping(e.target.value)}
                                    value={numberAddressShipping}
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
                                    onChange={(e) => setShippingCity(e.target.value)}
                                    value={shippingCity}

                                />
                            </div>

                            <div>
                                <label>UF*</label>
                                <input
                                    type="text"
                                    id=""
                                    name=""
                                    placeholder="Digite seu estado"
                                    onChange={(e) => setShippingState(e.target.value)}
                                    value={shippingState}

                                />
                            </div>
                            <div>
                                <label>Bairro*</label>
                                <input
                                    type="text"
                                    id="bairro"
                                    name="bairro"
                                    placeholder="Digite seu bairro"
                                    onChange={(e) => setShippingNeighbourhood(e.target.value)}
                                    value={shippingNeighbourhood}

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
                                <input type="date" name="start" value={startDate} disabled />
                            </div>
                            <div>
                                <label htmlFor="end">Devolução</label>
                                <input type="date" name="end" value={endDate} disabled />
                            </div>
                        </div>


                        <div style={{ padding: '1rem 0 0 0' }}>
                            <p >Quantidade de dias: {totalDays}</p>
                            <div style={{ padding: ".7rem 0" }}>

                                <p>Frete: {billing.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                <p style={{ padding: '0.5rem 0 0 0' }}>Aluguel: {price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                <p style={{
                                    paddingTop: '.5rem'
                                }}>
                                    TOTAL:
                                    {
                                        newPrice ?
                                            (newPrice + billing).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) :
                                            price ? (price + billing).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''
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
                            onClick={usuario?.id != null ? (e)=>sendQuote(e): (e)=>sendLead(e)}
                        />
                        {errorCreateLeadZoho && <p style={{ color: 'red', textAlign: 'center', paddingTop: '.5rem', fontSize: '.7rem' }}>{errorCreateLeadZoho}</p>}
                    </form>
                    {errorData && <p style={{ color: 'red', textAlign: 'center', paddingTop: '.5rem', fontSize: '.7rem' }}>{errorData}</p>}
                </div>
            </section>}


            {keyDocument &&
                <section style={{ paddingRight: '5rem' }}>
                    <div style={{ padding: '.5rem 5rem' }}>
                        <Title level={3}>
                            Dados do contratante
                        </Title>
                    </div>
                    <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <form style={{ marginLeft: "5rem" }}>
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
                                        <label style={{ display: "block" }}>Nome*</label>
                                        <input
                                            type="text"
                                            id="name_user"
                                            name="name_user"
                                            onChange={(e) => setNameUser(e.target.value)}
                                            placeholder="Digite seu nome"
                                            style={{
                                                width: '100%',
                                                border: '1px solid #ccc',
                                                padding: '.5rem .5rem',
                                                background: 'transparent',
                                                borderRadius: '8px'

                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: "block" }}>CPF*</label>
                                        <input
                                            type="text"
                                            id="cpf_user"
                                            name="cpf_user"
                                            placeholder="000.000.000-00"
                                            onChange={(e) => setCpfUser(e.target.value)}
                                            value={cpfUser}
                                            style={{
                                                width: '100%',
                                                border: '1px solid #ccc',
                                                padding: '.5rem .5rem',
                                                background: 'transparent',
                                                borderRadius: '8px'

                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: "block" }}>Data de nascimento*</label>
                                        <input
                                            type="date"
                                            id="date_birthday"
                                            name="date_birthday"
                                            onChange={(e) => setDateBirthday(e.target.value)}
                                            style={{
                                                width: '100%',
                                                border: '1px solid #ccc',
                                                padding: '.5rem .5rem',
                                                background: 'transparent',
                                                borderRadius: '8px'

                                            }}
                                        />
                                    </div>

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', gap: '1rem' }}>
                                    <div style={{ width: '100%' }}>
                                        <Input
                                            type="email"
                                            label="Email*"
                                            name="email_user"
                                            id="email_user"
                                            placeholder="emailexample@com.br"
                                            {...email_user}
                                            disabled={false}
                                        />
                                    </div>
                                    <div style={{ width: '100%' }}>

                                        <Input
                                            type="text"
                                            label="Telefone*"
                                            name="tel_user"
                                            id="tel_user"
                                            placeholder="(00) 000000000"
                                            {...tel_user}
                                            disabled={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            {errorData && <p style={{ color: 'red', textAlign: 'left', paddingTop: '.5rem', fontSize: '.7rem' }}>{errorData}</p>}
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
                                    <div style={{ width: "100%" }}>
                                        <label htmlFor="start" style={{ display: 'block', fontWeight: '600' }}>início</label>
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
                                        <label htmlFor="end" style={{ display: 'block', fontWeight: '600' }}>Devolução</label>
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


                                <div>
                                    <p >Quantidade de dias: {totalDays}</p>
                                    <div>

                                        <p>Frete: {billing.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                        <p style={{ padding: '0.5rem 0 0 0' }}>Aluguel: {price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                        <p style={{
                                            paddingTop: '.5rem'
                                        }}>
                                            TOTAL:
                                            {
                                                newPrice ?
                                                    (newPrice + billing).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) :
                                                    price ? (price + billing).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : ''
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
                                    onClick={(e) => createSignerDocument(e)}
                                />
                            </form>
                        </div>
                    </section>
                </section>
            }

            {keyDocumentSign &&
                <>
                    <div style={{ padding: '1rem 5rem' }}>
                        <Title level={1}>
                            Visualização do contrato de aluguel:
                        </Title>
                        <Document />
                    </div>
                </>
            }
            <Footer />

        </>
    );
}
