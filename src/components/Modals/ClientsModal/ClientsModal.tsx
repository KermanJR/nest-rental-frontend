
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { Input } from 'src/components/Input/Input';
import React from 'react';
import Button from 'src/components/Button/Button';
import { ModalProps } from '../../../default/interfaces/Interfaces';
import { Title } from 'src/components/Title/Title';




export const ClientsModal = ({openModal, setModal}: ModalProps) => {
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
              Cadastre um novo cliente
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
                value={razaoSocial}
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
                  value={razaoSocial}
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
                  value={razaoSocial}
                />
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', gridGap: '2rem'}}>
                  <Input
                    placeholder='Digite a inscrição estdual'
                    name="insc_state"
                    id="insc_state"
                    error=''
                    label='Inscrição estadual'
                    type='text'
                    onChange={(e)=>setRazaoSocial(e.target.value)}
                    onBlur={(e)=>setRazaoSocial(e.target.value)}
                    value={razaoSocial}
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
                    value={razaoSocial}
                  />
                </div>
                <div style={{display: 'flex', gridGap: '1rem', width: '20rem'}}>
                  <Button text="Cadastrar" />
                  <Button text="Cancelar" />
                </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
