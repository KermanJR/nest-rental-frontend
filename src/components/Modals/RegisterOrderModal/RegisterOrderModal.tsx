
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import React, { useContext, useEffect } from 'react';
import { ModalProps } from 'src/default/interfaces/Interfaces';
import { Title } from 'src/components/Title/Title';
import { Input } from 'src/components/Input/Input';
import { useForm } from 'src/hooks/useForm';
import Button from 'src/components/Button/Button';
import {useState} from 'react';
import { Produto } from 'src/models/crypto_order';
import { api } from 'src/api/api';
import SearchCep from 'src/helpers/SearchCep';
import { ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';
import { UserContext } from 'src/context/UserContext';
import { Today } from '@mui/icons-material';

export const RegisterOrderModal = ({openModal, setModal, data, edit}: ModalPropsTestEdit) => {
  

  const { id_tokencontrato } = data;

  //frete e total
  const [billingValue, setBillingValue] = React.useState(null);
  const [totalBudget, setTotalBudget] = React.useState(null);


  //detalhes e endereço de usuário
  const [userDetails, setUserDetails] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [idUser, setIdUser] = useState(data['id']);
  const [idUserAddress, setIdUserAddress] = useState(data['id_endereco']);


  //status contrato clicksign
  const [statusDocument, setStatusDocument] = React.useState('');

  //datas
  const [dateMin, setDateMin] = useState('');
  const [date, setDate] = useState('');


  //id product
  const [product, setProduct] = React.useState('');


  //busca endereço do usuário pelo id
  async function queryAddressById(){
    setUserAddress(null)
    const {data} = await api.get(`/enderecos/${idUserAddress}`);
    if(data){
       setUserAddress(data);
    }else{
      setUserDetails(null);
    }
  }

  async function getStatusDocument(){
    const fetchDocument = fetch(`https://nest-rental-backend-api.herokuapp.com/get-document/${id_tokencontrato}`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
    })

    const response = await fetchDocument;
    const json = await response.json();
    let status = json.data.status;
    if(status === 'running'){
      setStatusDocument('Em processo')
    }else if(status === 'canceled'){
      setStatusDocument('Cancelado');
    }
  }

  //busca produto pelo id
  async function queryProductById(){
    setProduct(null)
    const response = await api.get(`/produtos/${data?.data?.itens[0].id_produto}`);
    if(response.data){
      console.log(response.data)
       setProduct(response.data[0].nome);
    }else{
      setProduct(null);
    }
  }


  


  //busca usuário pelo id
  async function queryUserById(){
    setUserDetails(null)
    const {data} = await api.get(`/usuarios/${idUser}`);
    if(data){
      setUserDetails(data['entidade']);
    }else{
      setUserDetails(null);
    }
}


  //formata data
  function formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
    return [year, month, day].join('-');
  }

  //bloqueia dias anteriores ao dia atual e os próximos dois dias
  function blockBeforeTwoDays(){
    var today = new Date();                   
    today.setDate(today.getDate() + 2); 
    var l = today.toISOString().split('T')[0]; 
    setDateMin(l);
  }

  useEffect(()=>{
    queryUserById()
    queryAddressById()
  },[idUser])

  useEffect(()=>{
    blockBeforeTwoDays();
    queryProductById();
  },[])

  useEffect(()=>{
    getStatusDocument();
  },[id_tokencontrato])

  const {
    usuario
  } = useContext(UserContext);
  
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
                        Detalhes do pedido:
                    </Title>
                </div>

                {/*Produto e CNPJ*/}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridGap: '1rem'}}>
                    <div style={{width: '100%'}}>
                        <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Produto</label>
                        <input 
                          type="text"
                          name="product"
                          value={product}
                          style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                          disabled
                        />
                    </div>
                    {usuario?.id_perfil === 1 || usuario?.id_perfil === 3?
                    <div style={{width: '100%'}}>
                      <label htmlFor="end" style={{display: "block", paddingTop: '1rem'}}>Status CNPJ</label>
                      <input type="text" 
                        value='{verificar status CNPJ}'
                        name="status_cnpj" 
                        style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                        disabled
                        />
                    </div>
                    
                    :
                    <>
                    </>
                  }
                  <div style={{width: '100%'}}>
                      <label htmlFor="end" style={{display: "block", paddingTop: '1rem'}}>Status Contrato</label>
                      <input type="text" 
                        value={statusDocument}
                        id="status_document"
                        name="status_document" 
                        style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                        disabled
                        />
                    </div>
                    
                </div>



                {/*Data de início e devolução do produto*/}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridGap: '1rem'}}>
                    <div style={{width: '100%'}}>
                        <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Início</label>
                        <input 
                          type="date"
                          name="start"
                          value={formatDate(data?.data?.data_inicio)}
                          style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                          disabled
                        />
                    </div>
                    <div style={{width: '100%'}}>
                        <label htmlFor="end" style={{display: "block", paddingTop: '1rem'}}>Devolução</label>
                        <input type="date" 
                          value={formatDate(data?.data?.data_entrega)}
                          name="end" 
                          style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                          disabled
                      />
                    </div>
                </div>


                {/*Dados do cliente*/}
                <div className={styles.formCheckout__div} style={{marginTop: '3rem'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gridGap: "1rem"
                    }}>
                        <Title level={3}>
                          Detalhes do cliente
                        </Title>
                    </div>
                    
                    {/*Razão Social*/}
                    <div style={{width: '100%'}}>
                      <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Razão Social</label>
                        <input 
                          type="text"
                          name="razao_social"
                          value={data?.data?.cliente?.razao_social}
                          style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                          disabled
                        />
                      </div>


                    {/*Nome fantsia e CNPJ*/}
                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}> 
                      <div style={{width: '100%'}}>
                        <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Nome Fantasia</label>
                          <input 
                            type="text"
                            name="fantasy_name"
                            value={data?.data?.cliente?.nome_fantasia}
                            style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            disabled
                          />
                      </div>
                      <div style={{width: '100%'}}>
                          <label htmlFor="end" style={{display: "block", paddingTop: '1rem'}}>CNPJ</label>
                          <input 
                              type="text" 
                              name="cnpj_client"
                              value={data?.data?.cliente?.documento}
                              style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                              disabled
                          />
                      </div>
                    </div>

                    {/*Inscrição Estadual e Email*/}
                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                      <div style={{width: '100%'}}>
                          <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Inscrição Estadual</label>
                            <input 
                              type="text"
                              name="insc_estadual"
                              value={data?.data?.cliente?.inscricao_estadual}
                              style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                              disabled
                            />
                        </div>
                        <div style={{width: '100%'}}>
                            <label htmlFor="end" style={{display: "block", paddingTop: '1rem'}}>Email</label>
                            <input 
                                type="text" 
                                name="email_client"
                                value={data?.data?.cliente?.email}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                    </div>
                </div>


                {/* DETALHES DO FATURAMENTO*/}
                <div className={styles.formCheckout__div} style={{marginTop: '3rem'}}>
                    <Title level={3}>
                        Detalhes do faturamento
                    </Title>
                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                            <div style={{width:"100%"}}>
                                <label style={{display: "block", paddingTop: '1rem'}}>Nome(responsável por receber)</label>
                                <input 
                                    type="text" 
                                    id="" 
                                    name="" 
                                    placeholder=""
                                    value={userAddress?.contato}
                                    style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                    disabled
                                />
                            </div>
                            <div style={{width:"100%"}}>
                                <label style={{display: "block", paddingTop: '1rem'}}>Telefone</label>
                                <input 
                                    type="text" 
                                    id="" 
                                    name="" 
                                    placeholder="Digite o nome do responsável"
                                    value={userAddress?.telefone}
                                    style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                    disabled
                                />
                            </div>
                            
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>CEP</label>
                            <input 
                                type="number" 
                                id="" 
                                name="" 
                                pattern="[0-9]+"
                                placeholder="Digite seu CEP"
                                value={data?.data?.cliente?.enderecos[0].endereco?.cep}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Rua/Av*</label>
                            <input 
                                type="text" 
                                id="street" 
                                name="street" 
                                placeholder="Digite sua rua ou avenida"
                                value={data?.data?.cliente?.enderecos[0].endereco?.rua}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Número*</label>
                            <input 
                                type="number" 
                                id="number" 
                                placeholder="Digite o número"
                                name="number"
                                value={data?.data?.cliente?.enderecos[0].endereco?.numero}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Cidade*</label>
                            <input 
                                type="text" 
                                id="country" 
                                placeholder="Digite sua cidade"
                                name="country" 
                                value={data?.data?.cliente?.enderecos[1].endereco?.cidade?.nome}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>

                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>UF*</label>
                            <input 
                                type="text" 
                                id="" 
                                placeholder="Digite seu estado"
                                name="" 
                                value={'SP'}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>

                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Bairro*</label>
                            <input 
                                type="text" 
                                id="bairro" 
                                placeholder="Digite seu bairro"
                                name="bairro"
                                value={data?.data?.cliente?.enderecos[1].endereco?.bairro}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Complemento</label>
                            <input 
                                type="text" 
                                id="" 
                                name=""
                                placeholder="Digite um complemento"
                                value={data?.data?.cliente?.enderecos[1].endereco?.complemento}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                    
                    </div>
                </div>

                {/* DETALHES DO ENTREGA*/}
                <div className={styles.formCheckout__div} style={{marginTop: '3rem'}}>
                    <Title level={3}>
                        Detalhes do entrega
                    </Title>
                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>CEP</label>
                            <input 
                                type="number" 
                                id="" 
                                name="" 
                                pattern="[0-9]+"
                                placeholder="Digite seu CEP"
                                value={data?.data?.cliente?.enderecos[1].endereco?.cep}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Rua/Av*</label>
                            <input 
                                type="text" 
                                id="street" 
                                name="street" 
                                placeholder="Digite sua rua ou avenida"
                                value={data?.data?.cliente?.enderecos[1].endereco?.rua}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Número*</label>
                            <input 
                                type="number" 
                                id="number" 
                                placeholder="Digite o número"
                                name="number"
                                value={data?.data?.cliente?.enderecos[1].endereco?.numero}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Cidade*</label>
                            <input 
                                type="text" 
                                id="country" 
                                placeholder="Digite sua cidade"
                                name="country" 
                                value={data?.data?.cliente?.enderecos[1].endereco?.cidade?.nome}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>

                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>UF*</label>
                            <input 
                                type="text" 
                                id="" 
                                placeholder="Digite seu estado"
                                name="" 
                                value={'SP'}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>

                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Bairro*</label>
                            <input 
                                type="text" 
                                id="bairro" 
                                placeholder="Digite seu bairro"
                                name="bairro"
                                value={data?.data?.cliente?.enderecos[1].endereco?.bairro}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Complemento</label>
                            <input 
                                type="text" 
                                id="" 
                                name=""
                                placeholder="Digite um complemento"
                                value={data?.data?.cliente?.enderecos[1].endereco?.complemento}
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                                disabled
                            />
                        </div>
                    
                    </div>
                </div>
            
              {usuario?.id_perfil === 1 || usuario?.id_perfil === 3 ? 
                <></>
                :
                
                <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                    <div  style={{width:"100%"}}>
                      <label style={{display: "block", paddingTop: '1rem'}}>Selecione a data de devolução:</label>
                        <input 
                          type="date" 
                          id="dateMax" 
                          name="stockDate"
                          placeholder=""
                          min={dateMin}
                          value={date}
                          required
                          onChange={(e)=>setDate(e.target.value)}
                          style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                        />
                    </div>

                    <div  style={{width:"100%"}}>
                      <label style={{display: "block", paddingTop: '1rem'}}>Anexar documento</label>
                        <input 
                          type="file" 
                          id="file_product" 
                          name="file_product"
                          placeholder=""
                          required
                          accept="application/pdf"
                          style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                        />
                    </div>
                  </div>
              }
              {usuario?.id_perfil === 2? <div style={{ display: 'flex', gridGap: '1rem', width: '20rem' }}>
                {edit ? <Button text="Alterar data de devolução" /> : <Button text="Cancelar" />}
                
              </div>: <></>
              }
               

                <div style={{marginTop: '2rem'}}>
                    <p style={{fontSize: '2rem'}}><b>Total: {data?.data?.vr_total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b></p>
                </div>
            </form>
          </div>
          
            
        </div>
      )}
    </>
  )
}
