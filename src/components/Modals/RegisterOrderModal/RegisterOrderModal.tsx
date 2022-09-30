
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { Title } from 'src/components/Title/Title';
import { Input } from 'src/components/Input/Input';
import Button from 'src/components/Button/Button';
import React from 'react';
import {ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';

export const RegisterOrderModal = ({openModal, setModal, data}: ModalPropsTestEdit) => {


  const [nameOrder, setNameOrder] = React.useState<String>('');

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
              <form>
                <div style={{display: 'flex', gridGap: '1rem'}}>
                  <Input
                    placeholder='Nome Pedido'
                    id='new_order'
                    label='Nome'
                    name='new_order'
                    type='text'
                    onChange={(e)=>setNameOrder(e.target.value)}
                    onBlur={(e)=>setNameOrder(e.target.value)}
                    value={nameOrder}
                    error=''
                  />
                  <Input
                    placeholder='Digite o ID do pedido'
                    id='id_order'
                    label='ID Pedido'
                    name="sss"
                    type='text'
                    onChange={(e)=>setNameOrder(e.target.value)}
                    onBlur={(e)=>setNameOrder(e.target.value)}
                    value={data['id']}
                    error=''
                  />
                </div>
                <div style={{display: 'flex', gridGap: '1rem'}}>
                  <Input
                    placeholder='Digite o valor do pedido'
                    id='value_order'
                    label='Valor Pedido'
                    name='new_order'
                    type='text'
                    onChange={(e)=>setNameOrder(e.target.value)}
                    onBlur={(e)=>setNameOrder(e.target.value)}
                    value={data['vr_total'].toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    error=''
                  />
                  <Input
                    placeholder=''
                    id='start_date'
                    label='Início'
                    name="start_date"
                    type='date'
                    onChange={(e)=>setNameOrder(e.target.value)}
                    onBlur={(e)=>setNameOrder(e.target.value)}
                    value={""}
                    error=''
                  />
                  <Input
                    id='final_date'
                    label='Devolução'
                    name='final_date'
                    placeholder=''
                    type='date'
                    onChange={(e)=>setNameOrder(e.target.value)}
                    onBlur={(e)=>setNameOrder(e.target.value)}
                    value={nameOrder}
                    error=''
                  />
                </div>

                <div style={{display: 'flex', width: '30%', gridGap: '1.5rem'}}>
                  <Button text="Cadastrar"/>
                  <Button text="Cancelar"/>
                </div>
                
              </form>
          </section>
        </div>
      )}
    </>
  )
}
