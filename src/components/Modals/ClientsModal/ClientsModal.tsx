
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { Input } from 'src/components/Input/Input';
import React from 'react';
import {ModalPropsTestEdit } from '../../../default/interfaces/Interfaces';
import { Title } from 'src/components/Title/Title';
import Button from 'src/components/Button/Button';




export const ClientsModal = ({openModal, setModal, data, edit}: ModalPropsTestEdit) => {
  const [razaoSocial, setRazaoSocial] = React.useState<String>('');

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
              Editar cliente
            </Title>
              <form>
                  <Input
                    placeholder='Digite a razão social'
                    name="razao_social"
                    id="razao_social"
                    error=''
                    label='Razão Social'
                    type='text'
                    onChange={(e)=>setRazaoSocial(e.target.value)}
                    onBlur={(e)=>setRazaoSocial(e.target.value)}
                    value={data['entidade']['razao_social']}
                  />
                  <div style={{display: 'flex', justifyContent: 'space-between', gridGap: '2rem'}}>
                    <Input
                      placeholder='Digite o nome fantasia'
                      name="company_name"
                      id="company_name"
                      error=''
                      label='Nome fantasia'
                      type='text'
                      onChange={(e)=>setRazaoSocial(e.target.value)}
                      onBlur={(e)=>setRazaoSocial(e.target.value)}
                      value={data['entidade']['nome_fantasia']}
                    />
                    <Input
                      placeholder='Digite o CNPJ'
                      name="cnpj_client"
                      id="cnpj_client"
                      error=''
                      label='CNPJ'
                      type='text'
                      onChange={(e)=>setRazaoSocial(e.target.value)}
                      onBlur={(e)=>setRazaoSocial(e.target.value)}
                      value={data['entidade']['documento']}
                    />
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', gridGap: '2rem'}}>
                      <Input
                        placeholder='Digite a inscrição estadual'
                        name="insc_state"
                        id="insc_state"
                        error=''
                        label='Inscrição estadual'
                        type='text'
                        onChange={(e)=>setRazaoSocial(e.target.value)}
                        onBlur={(e)=>setRazaoSocial(e.target.value)}
                        value={data['entidade']['inscricao_estadual']}
                      />
                      <Input
                        placeholder='Digite o E-mail'
                        name="email_client"
                        id="email_client"
                        error=''
                        label='E-mail'
                        type='text'
                        onChange={(e)=>setRazaoSocial(e.target.value)}
                        onBlur={(e)=>setRazaoSocial(e.target.value)}
                        value={data['entidade']['email']}
                      />
                  </div>
                  <div style={{display: 'flex', gridGap: '1rem', width: '20rem'}}>
                  {edit? <Button text="Editar" />:  <Button text="Cadastrar" />  }
                    <Button text="Cancelar" />
                  </div>
              </form>
          </section>
        </div>
      )}
    </>
  )
}
