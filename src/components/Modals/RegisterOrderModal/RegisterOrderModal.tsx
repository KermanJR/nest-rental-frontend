
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { Title } from 'src/components/Title/Title';
import { Input } from 'src/components/Input/Input';
import Button from 'src/components/Button/Button';
import React from 'react';
import {ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';

export const RegisterOrderModal = ({openModal, setModal, data, edit}: ModalPropsTestEdit) => {


  const [nameOrder, setNameOrder] = React.useState<string>('');

  //Valor
  const [editedValueOrder, setEditedValueOrder] = React.useState<string>(data['vr_total']);
  const [newValueOrder, setNewValueOrder] = React.useState<string>('');

  //Descrição
  const [editedDescriptionOrder, setEditedDescriptionOrder] = React.useState<string>(data['descricao']);
  const [newDescriptionOrder, setNewDescriptionOrder] = React.useState<string>('');

  //Data inicio
  const [editedDateInitOrder, setEditedDateInitOrder] = React.useState(data['data_inicio']);
  const [newDateInitOrder, setNewDateInitOrder] = React.useState('');

  //Data fim
  const [editedDateEndOrder, setEditedDateEndOrder] = React.useState<string>(data['data_entrega']);
  const [newDateEndOrder, setNewDateEndOrder] = React.useState<string>('');

  const [idOrder, setIdOrder] = React.useState(null);

  const [loading, setLoading] = React.useState<Boolean>(false);
  const [message, setMessage] = React.useState<string>('');


  //editar pedido
  async function editOrderById(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    const teste = fetch(`https://nest-rental-backend.herokuapp.com/api/pedidos/${idOrder}`, {
      headers:{
        'Content-Type': 'application/json',
      }, 
      method: 'PUT',
      body: JSON.stringify({
          "descricao": editedDescriptionOrder,
          "data_entrega": editedDateInitOrder,
          "data_inicio": editedDateEndOrder,
          "vr_total": editedValueOrder 
      })
    })

    const data = await teste;
    const dataJson = await data.json();
    if(dataJson){
      setMessage('Pedido editado com sucesso.')
    }
    setLoading(false)
    //window.location.reload();
  }

  //Criar pedido
  async function CreateOrder(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    const teste = fetch(`https://nest-rental-backend.herokuapp.com/api/pedidos`, {
      headers:{
        'Content-Type': 'application/json',
      }, 
      method: 'POST',
      body: JSON.stringify({
          "descricao": newDescriptionOrder,
          "data_entrega": newDateEndOrder,
          "data_inicio": newDateInitOrder,
          "vr_total": newValueOrder 
      })
    })

    const data = await teste;
    const dataJson = await data.json();
    if(dataJson){
      setMessage('Pedido criado com sucesso.')
    }
    setLoading(false)
   //window.location.reload();
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
              <Title>
                Cadastre um novo pedido
              </Title>
              <p></p>
              <form onSubmit={edit? editOrderById: CreateOrder}>
                <div 
                  style={{
                    display: 'flex',
                    gridGap: '1rem',
                    justifyContent: 'space-between',
                    grid: '1rem',
                    width: '100%'

                  }}>

                  <div style={{marginTop: '1rem', width: '100%'}}>
                    <label style={{display: 'block'}}>Descrição do pedido</label>
                      <input 
                        type="text"
                        name="order_description"
                        id="order_description"
                        placeholder="Digite a descrição do pedido"
                        value={edit? editedDescriptionOrder: newDescriptionOrder}
                        onChange={
                          edit? (e)=>setEditedDescriptionOrder(e.target.value): (e)=>setNewDescriptionOrder(e.target.value)}
                        style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
                      />
                  </div>

                  <div style={{marginTop: '1rem', width: '100%'}}>
                    <label style={{display: 'block'}}>Valor do pedido</label>
                      <input 
                        type="text"
                        name="order_value"
                        id="order_value"
                        placeholder="R$"
                        value={edit? editedValueOrder: newValueOrder}
                        onChange={
                          edit? (e)=>setEditedValueOrder(e.target.value): (e)=>setNewValueOrder(e.target.value)}
                        style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
                      />
                  </div>

              </div>
              
              <div style={{display: 'flex', gridGap: '1rem'}}>
                <div style={{marginTop: '1rem'}}>
                  <label style={{display: 'block'}}>Data de inicio</label>
                    <input 
                      type="date"
                      name="date_init"
                      id="date_init"
                      placeholder=""
                      value={edit? editedDateInitOrder: newDateInitOrder}
                      onChange={
                        edit? (e)=>setEditedDateInitOrder(e.target.value): (e)=>setNewDateInitOrder(e.target.value)}
                      style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
                    />
                </div>
          
                <div style={{marginTop: '1rem'}}>
                  <label style={{display: 'block'}}>Data de entrega</label>
                    <input 
                      type="date"
                      name="date_end"
                      id="date_end"
                      placeholder=""
                      value={edit? editedDateEndOrder: newDateEndOrder}
                      onChange={
                        edit? (e)=>setEditedDateEndOrder(e.target.value): (e)=>setNewDateEndOrder(e.target.value)}
                      style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
                    />
                </div>
              </div>

              <div style={{ display: 'flex', gridGap: '1rem', width: '20rem' }}>
                {edit ? <Button text="Editar" /> : <Button text="Cadastrar" />}
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
