
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import React from 'react';
import { ModalProps } from 'src/default/interfaces/Interfaces';
import { Title } from 'src/components/Title/Title';
import { Input } from 'src/components/Input/Input';
import { useForm } from 'src/hooks/useForm';
import Button from 'src/components/Button/Button';
import {useState} from 'react';
import { Produto } from 'src/models/crypto_order';
import { api } from 'src/api/api';
import SearchCep from 'src/helpers/SearchCep';

export const BudgetsModal = ({openModal, setModal}: ModalProps) => {

    const razaoSocial = useForm('');
    const fantasyName = useForm('');
    const cnpj = useForm('cnpj');
    const insc_estadual = useForm('insc_estadual');
    const email_company = useForm('email')
    const email_user = useForm('email');
    const tel_company = useForm('telefone');
    const tel_user = useForm('telefone');
    const passwordClient = useForm('password')

    //Billing and total
    const [billingValue, setBillingValue] = React.useState(null);
    const [totalBudget, setTotalBudget] = React.useState(null);

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
     const [nameResp, setNameResp] = React.useState('');
     const [errorData, setErrorData] = React.useState('');

    const [produtos, setProdutos] = useState<Produto[]>([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorCep, setErrorCep] = React.useState('');

   

    /*Verifica se o CEP está dentro do frete*/
    async function buscaCep(cep: string){
        const json = await SearchCep(cep)
        const faixaCep = (json.cep).split('-', 1);
        setBillingStreet(json.logradouro);
        setBillingBairro(json.bairro);
        setBillingCity(json.localidade)
        setBillingState(json.uf)
        if(faixaCep >= '11000' && faixaCep <= '11999'){
            setBillingValue(1800);
            setErrorCep('')
        }

        else if(faixaCep >= '12000' && faixaCep <= '19999'){
            setBillingValue(1800);
            setErrorCep('')
        }

        else if(faixaCep >= '06000' && faixaCep <= '09999'){
            setBillingValue(730);
            setErrorCep('')
        }

        else if(faixaCep >= '01000' && faixaCep <= '05999'){
            setBillingValue(320);
            setErrorCep('')
        }
        else{
            setErrorCep('Área fora de cobertura de nossos serviços.')
        }
    }


    async function queryProductsById(){
        setProdutos(null)
        const {data} = await api.get(`/produtos`);
        if(data){
            setProdutos(data);
        }else{
            setProdutos(null);
        }
    }

    React.useEffect(()=>{
        queryProductsById()
    },[])

    React.useEffect(()=>{
        buscaCep(billingCep)
    },[billingCep])

    const { id_perfil } = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : 0

 
  return (
    <>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modal__divCloseButton}>
          <button 
              className={styles.modal__divCloseButton__closeButton}
              onClick={(e)=>setModal(!openModal)}
            >
              <AiFillCloseCircle/>
            </button>
            <form className={styles.formCheckout} style={{textAlign: 'left'}}>
                <div style={{width: '50%'}}>
                    <Title level={3}>
                        Selecione o produto:
                    </Title>

                    {produtos && 
                      <select style={{width: '100%', height: '40px', borderRadius: '8px', borderColor: '#ccc'}}>
                        {produtos.map((item, index)=>{
                          return  <>
                                    <option value={item.id} key={item.id}>{item.nome}</option>
                                  </>
                          
                        })} 
                    </select>
                    }
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridGap: '1rem'}}>
                    <div style={{width: '100%'}}>
                        <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Início</label>
                        <input 
                            type="date"
                            name="start"
                            onChange={(e)=>setStartDate(e.target.value)}
                            style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                        />
                    </div>
                    <div style={{width: '100%'}}>
                        <label htmlFor="end" style={{display: "block", paddingTop: '1rem'}}>Devolução</label>
                        <input type="date" 
                            name="end" 
                            onChange={(e)=>setEndDate(e.target.value)} 
                            style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                        />
                    </div>
                </div>
                <div className={styles.formCheckout__div}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gridGap: "1rem"
                    }}>
                        <Title level={3}>
                        Dados do cliente
                        </Title>
                    </div>
                    
                    <Input
                        type="text"
                        label="Razão social"
                        name="razao_social"
                        id="razao_social"
                        placeholder="Digite sua razão social"
                        {...razaoSocial}
                    />

                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}> 
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

                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
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
                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>CEP</label>
                            <input 
                                type="number" 
                                id="" 
                                name="" 
                                pattern="[0-9]+"
                                placeholder="Digite seu CEP"
                                onChange={(e)=>setPayCep(e.target.value)}
                                value={payCep}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Rua/Av*</label>
                            <input 
                                type="text" 
                                id="street" 
                                name="street" 
                                placeholder="Digite sua rua ou avenida"
                                onChange={(e)=>setPayStreet(e.target.value)}
                                value={payStreet}
                                 style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Número*</label>
                            <input 
                                type="number" 
                                id="number" 
                                placeholder="Digite o número"
                                name="number"
                                onChange={(e)=>setNumberAddressPay(e.target.value)}
                                value={numberAddressPay}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div >
                            <label style={{display: "block", paddingTop: '1rem'}}>Cidade*</label>
                            <input 
                                type="text" 
                                id="country" 
                                placeholder="Digite sua cidade"
                                name="country" 
                                onChange={(e)=>setPayCity(e.target.value)}
                                value={payCity}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            
                            />
                        </div>

                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>UF*</label>
                            <input 
                                type="text" 
                                id="" 
                                placeholder="Digite seu estado"
                                name="" 
                                onChange={(e)=>setPayState(e.target.value)}
                                value={payState}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>

                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>Bairro*</label>
                            <input 
                                type="text" 
                                id="bairro" 
                                placeholder="Digite seu bairro"
                                name="bairro" 
                                onChange={(e)=>setPayBairro(e.target.value)}
                                value={payBairro}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>Complemento</label>
                            <input 
                                type="text" 
                                id="" 
                                name=""
                                placeholder="Digite um complemento"
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                    
                    </div>
                </div>
            

                

                <div className={styles.formCheckout__div}>
                    <Title level={3}>
                        Detalhes de entrega
                    </Title>
                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                            <div style={{width:"100%"}}>
                                <label style={{display: "block", paddingTop: '1rem'}}>Nome(responsável por receber):*</label>
                                <input 
                                    type="text" 
                                    id="" 
                                    name="" 
                                    placeholder="Digite o nome do responsável"
                                    onChange={(e)=>setNameResp(e.target.value)}
                                    style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
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
                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>CEP*</label>
                            <input 
                                type="number" 
                                id="" 
                                name="" 
                                pattern="[0-9]+"
                                placeholder="Digite seu CEP"
                                onChange={(e)=>setBillingCep(e.target.value)}
                                value={billingCep}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                        <div style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Rua/Av*</label>
                            <input 
                                type="text" 
                                placeholder="Digite sua rua ou avenida"
                                id="street" 
                                name="street" 
                                onChange={(e)=>setBillingStreet(e.target.value)}
                                value={billingStreet}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                             
                            />
                        </div>
                        <div style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Número*</label>
                            <input 
                                type="number" 
                                id="number" 
                                name="number"
                                placeholder="Digite o número"
                                onChange={(e)=>setNumberAddressBilling(e.target.value)}
                                value={numberAddressBilling}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>Cidade*</label>
                            <input 
                                type="text" 
                                id="country" 
                                placeholder="Digite sua cidade"
                                name="country" 
                                onChange={(e)=>setBillingCity(e.target.value)}
                                value={billingCity}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                               
                            />
                        </div>

                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>UF*</label>
                            <input 
                                type="text" 
                                id="" 
                                name="" 
                                placeholder="Digite seu estado"
                                onChange={(e)=>setBillingState(e.target.value)}
                                value={billingState}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>Bairro*</label>
                            <input 
                                type="text" 
                                id="bairro" 
                                name="bairro" 
                                placeholder="Digite seu bairro"
                                onChange={(e)=>setBillingBairro(e.target.value)}
                                value={billingBairro}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                
                            />
                        </div>
                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>Complemento</label>
                            <input 
                                type="text" 

                                id="" 
                                placeholder="Digite um complemento"
                                name=""
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                    </div>
                </div>
                <div style={{paddingTop: "1rem"}}>
                    <p><b>Frete:</b> {!errorCep? billingValue?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}): <label style={{color: 'red'}}>{errorCep}</label>}</p>
                </div>
                <div>
                    <p><b>Total:</b></p>
                </div>
                {id_perfil === 3? '': <div style={{ display: 'flex', gridGap: '1rem', width: '20rem' }}>
                <Button text="Editar" /> <Button text="Cadastrar" />
                <Button text="Cancelar" />
              </div>
            }

                
            </form>
          </div>
          
            
        </div>
      )}
    </>
  )
}
