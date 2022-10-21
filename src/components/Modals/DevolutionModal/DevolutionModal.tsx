
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { useContext } from 'react';
import { Title } from 'src/components/Title/Title';
import Button from 'src/components/Button/Button';
import { ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';
import { UserContext } from 'src/context/UserContext';

export const DevolutionModal = ({openModal, setModal, data, edit}: ModalPropsTestEdit) => {


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
                <Title level={3}>
                    Detalhes da devolução
                </Title>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridGap: '1rem'}}>
                    <div style={{width: '100%'}}>
                        <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Produto</label>
                        <input 
                            type="text"
                            name="product"
                            value=""
                            placeholder="{produto a ser devolvido}"
                            style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            disabled
                        />
                    </div>
                    <div style={{width: '100%'}}>
                        <label htmlFor="end" style={{display: "block", paddingTop: '1rem'}}>Valor</label>
                        <input type="text" 
                            name="valor" 
                            value=""
                            placeholder="{valor do produto a ser devolvido}"
                            style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            disabled
                        />
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridGap: '1rem'}}>
                    <div style={{width: '100%'}}>
                        <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Início</label>
                        <input 
                            type="date"
                            name="start"
                            value=""
                            style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            disabled
                        />
                    </div>
                    <div style={{width: '100%'}}>
                        <label htmlFor="end" style={{display: "block", paddingTop: '1rem'}}>Devolução</label>
                        <input type="date" 
                            name="end" 
                            value=""
                            style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                            disabled
                        />
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridGap: '1rem'}}>
                  {usuario?.id_perfil === 1 ||usuario?.id_perfil === 3 ? 
                    <div style={{width: '25%'}}>
                      <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Status da devolução</label>
                      <select style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}>
                        <option value={1}>Pendente</option>
                        <option value={1}>Concluído</option>
                      </select>
                    </div>
                    :
                    <div style={{width: '25%'}}>
                      <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Status da devolução</label>
                      <input type="text" 
                        name="end" 
                        value="{status da devolução}"
                        style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                        disabled
                      />
                    </div>
                  }



                  {usuario?.id_perfil === 1 ||usuario?.id_perfil === 3 ?
                  <div style={{width: '100%'}}>
                    <label htmlFor="start" style={{display: "block", paddingTop: '1rem'}}>Documento anexado</label>
                    <input type="text" 
                      name="document" 
                      value=""
                      placeholder='{Documento anexado}'
                      style={{width: "100%", padding: ".7rem", borderRadius: "8px", border: "1px solid #ccc"}}
                      />
                  </div>
                  :
                  <>
                  </>
                }
              </div>
      
              {
                usuario?.id_perfil === 1 && (
                  <div style={{ display: 'flex', gridGap: '1rem', width: '20rem' }}>
                    {edit ? <Button text="Editar" />: <Button text="Cadastrar" />}
                    <Button text="Cancelar" />
                </div>
                )
              }
                
            </form>
          </div>
          
            
        </div>
      )}
    </>
  )
}
