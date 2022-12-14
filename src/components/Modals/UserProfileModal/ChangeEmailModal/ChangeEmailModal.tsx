
import styles from '../../../Modals/Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';
import { useState } from 'react';
import Button from 'src/components/Button/Button';
import { Title } from 'src/components/Title/Title';



export const ChangeEmailModal = ({openModal, setModal, data, edit}: ModalPropsTestEdit) => {

  const [editedEmail, setEditedEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [idUser, setIdUser] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [message, setMessage] = useState<string>('');


  //editar email
  async function changeEmail(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    const teste = fetch(`https://nest-rental-backend.herokuapp.com/api/categorias/${idUser}`, {
      headers:{
        'Content-Type': 'application/json',
      }, 
      method: 'PUT',
      body: JSON.stringify({
          "password": editedEmail 
      })
    })

    const data = await teste;
    const dataJson = await data.json();
    setEditedEmail(dataJson.descricao)
    setMessage('Email alterada=o com sucesso.')
    setLoading(false)
    window.location.reload();
  }


  return (
    <>
      {openModal && (
        <div className={styles.modalCategory}>
          <div className={styles.modal__divCloseButton}>
            <button 
                className={styles.modal__divCloseButton__closeButton}
                onClick={(e)=>setModal(!openModal)}
              >
              <AiFillCloseCircle/>
            </button>
          </div>
          
          <Title>Editar e-mail</Title>
          <form onSubmit={edit && changeEmail}>
            <div style={{marginTop: '1rem'}}>
              <label style={{display: 'block'}}>E-mail</label>
              <input 
                type="text"
                name="new_email"
                id="new_email"
                placeholder="Digite o novo e-mail"
                value={edit? editedEmail: newEmail}
                onChange={
                  edit? (e)=>setEditedEmail(e.target.value): (e)=>setNewEmail(e.target.value)}
                style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
              />
            </div>
            <div style={{display: 'flex', gridGap: '1rem', width: '20rem'}}>
            {edit? <Button text="Editar" />:  <Button text="Cadastrar" />  }
              <Button text="Cancelar" />
            </div>
            <div>

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
            </div>
          </form>
            
        </div>
      )}
    </>
  )
}
