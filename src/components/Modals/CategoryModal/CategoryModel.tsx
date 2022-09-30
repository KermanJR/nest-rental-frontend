
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';
import { useState } from 'react';
import Button from 'src/components/Button/Button';
import { Title } from 'src/components/Title/Title';

export const CategoryModal = ({openModal, setModal, data, edit}: ModalPropsTestEdit) => {

  const [category, setCategory] = useState<string>('');
  const [idCategory, setIdCategory] = useState<string>('');


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
          
          <Title>Nova categoria</Title>
          <form>
            <div style={{marginTop: '1rem'}}>
              <label style={{display: 'block'}}>Nome da categoria</label>
              <input 
                type="text"
                name="category"
                id="category"
                placeholder="Digite o nome da categoria"
                value={data['descricao']}
                onChange={(e)=>setCategory(e.target.value)}
                style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
              />
            </div>
            <div  style={{marginTop: '1rem'}}>
              <label style={{display: 'block'}}>ID da categoria</label>
              <input 
                type="text"
                name="id_category"
                id="id_category"
                placeholder="Digite o ID da categoria"
                value={data['id']}
                onChange={(e)=>setIdCategory(e.target.value)}
                style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
              />
            </div>
            <div style={{display: 'flex', gridGap: '1rem', width: '20rem'}}>
            {edit? <Button text="Editar" />:  <Button text="Cadastrar" />  }
              <Button text="Cancelar" />
            </div>
          </form>
            
        </div>
      )}
    </>
  )
}
