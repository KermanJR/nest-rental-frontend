
import styles from '../../../Modals/Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { Input } from 'src/components/Input/Input';
import React from 'react';
import { ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';
import { Title } from 'src/components/Title/Title';
import Button from 'src/components/Button/Button';




export const AddressPayModal = ({openModal, setModal, data, edit}: ModalPropsTestEdit) => {


  /*PAY ADDRESS*/

  //street
  const [payEditedStreet, setPayEditedStreet] = React.useState<string>('');
  const [payNewStreet, setPayNewStreet] = React.useState<string>('');


  //neighbourhood
  const [payEditedNeighbourhood, setPayEditedNeighbourhood] = React.useState<string>('');
  const [payNewNeighbourhood, setPayNewNeighbourhood] = React.useState<string>('');

  //city
  const [payEditedCity, setPayEditedCity] = React.useState<string>('');
  const [payNewCity, setPayNewCity] = React.useState<string>('');

  //state
  const [payEditedState, setPayEditedState] = React.useState<string>('');
  const [payNewState, setPayNewState] = React.useState<string>('');

  //number of address
  const [payEditedNumberAddress, setPayEditedNumberAddress] = React.useState(null);
  const [payNewNumberAddress, setPayNewNumberAddress] = React.useState(null);

  //complement
  const [payEditedComplement, setPayEditedComplement] = React.useState<string>('');
  const [payNewComplement, setPayNewComplement] = React.useState<string>('');

  //cep
  const [payEditedCep, setPayEditedCep] = React.useState('');
  const [payNewCep, setPayNewCep] = React.useState('');

  //nome responsável
  const [nameEditedResp, setNameEditedResp] = React.useState<string>('');
  const [nameNewResp, setNameNewResp] = React.useState<string>('');



  const [loading, setLoading] = React.useState<Boolean>(false);
  const [message, setMessage] = React.useState<string>('');



  //editar endereço de faturamento
  async function editAddressById(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    const teste = fetch(`https://nest-rental-backend.herokuapp.com/api/usuarios/${''}`, {
      headers:{
        'Content-Type': 'application/json',
      }, 
      method: 'PUT',
      body: JSON.stringify({
         
            "documento": '',
            "email": '',
            "nome_fantasia": '',
            "razao_social": '',
            "tipo": "J"
          
      })
    })

    const data = await teste;
    const dataJson = await data.json();
    if(dataJson){
      setMessage('Endereço editado com sucesso.')
    }
    setLoading(false)
    window.location.reload();
  }

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
          </div>

          <section>
              <form onSubmit={edit && editAddressById}>
                  <div className={styles.formCheckout__div}>
                    <Title level={3}>
                        Detalhes do faturamento
                    </Title>
                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>CEP</label>
                            <input 
                                type="number" 
                                id="cep_client" 
                                name="cep_client" 
                                pattern="[0-9]+"
                                placeholder="Digite seu CEP"
                                value={edit? payEditedCep: payNewCep}
                                onChange={
                                  edit? (e)=>setPayEditedCep(e.target.value): (e)=>setPayNewCep(e.target.value)
                                }
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Rua/Av*</label>
                            <input 
                                type="text" 
                                id="street_client" 
                                name="street_client" 
                                placeholder="Digite sua rua ou avenida"
                                value={edit? payEditedStreet: payNewStreet}
                                onChange={
                                  edit? (e)=>setPayEditedStreet(e.target.value): (e)=>setPayEditedStreet(e.target.value)
                                }
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                        <div  style={{width:"100%"}}>
                            <label style={{display: "block", paddingTop: '1rem'}}>Número*</label>
                            <input 
                                type="number" 
                                id="number_client" 
                                placeholder="Digite o número"
                                name="number_client"
                                value={edit? payEditedNumberAddress: payNewNumberAddress}
                                onChange={
                                  edit? (e)=>setPayEditedNumberAddress(e.target.value): (e)=>setPayNewNumberAddress(e.target.value)
                                }
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between", gridGap: "1rem"}}>
                        <div >
                            <label style={{display: "block", paddingTop: '1rem'}}>Cidade*</label>
                            <input 
                                type="text" 
                                id="country_client" 
                                placeholder="Digite sua cidade"
                                name="country_client" 
                                value={edit? payEditedCity: payNewCity}
                                onChange={
                                  edit? (e)=>setPayEditedCity(e.target.value): (e)=>setPayNewCity(e.target.value)
                                }
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            
                            />
                        </div>

                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>UF*</label>
                            <input 
                                type="text" 
                                id="state_client" 
                                placeholder="Digite seu estado"
                                name="state_client" 
                                value={edit? payEditedState: payNewState}
                                onChange={
                                  edit? (e)=>setPayEditedState(e.target.value): (e)=>setPayNewState(e.target.value)
                                }
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>

                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>Bairro*</label>
                            <input 
                                type="text" 
                                id="neighbour_client" 
                                placeholder="Digite seu bairro"
                                name="neighbour_client" 
                                value={edit? payEditedNeighbourhood: payNewNeighbourhood}
                                onChange={
                                  edit? (e)=>setPayEditedNeighbourhood(e.target.value): (e)=>setPayNewNeighbourhood(e.target.value)
                                }
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                        <div>
                            <label style={{display: "block", paddingTop: '1rem'}}>Complemento</label>
                            <input 
                                type="text" 
                                id="complement_client" 
                                name="complement_client"
                                placeholder="Digite um complemento"
                                value={edit? payEditedComplement: payNewComplement}
                                onChange={
                                  edit? (e)=>setPayEditedComplement(e.target.value): (e)=>setPayNewComplement(e.target.value)
                                }
                                style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            />
                        </div>
                    
                    </div>
                    </div>
                  <div style={{display: 'flex', gridGap: '1rem', width: '20rem'}}>
                  {edit? <Button text="Editar" />:  <Button text="Cadastrar" />  }
                    <Button text="Cancelar" />
                  </div>
                  {loading && (             
                <svg  version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="40px" height="40px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" xmlSpace="preserve" style={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    marginTop: '10px'
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

              )}

              {!loading && (
                <p style={{color: 'green'}}>{message}</p>
              )}
              </form>
          </section>
        </div>
      )}
    </>
  )
}
