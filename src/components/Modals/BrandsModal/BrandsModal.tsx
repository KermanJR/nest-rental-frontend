
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { ModalProps } from 'src/default/interfaces/Interfaces';
import { useState } from 'react';
import Button from 'src/components/Button/Button';
import { Title } from 'src/components/Title/Title';


export const BrandsModal = ({openModal, setModal}: ModalProps) => {

  const [brand, setBrand] = useState<string>('');
  const [idBrand, setIdBrand] = useState<string>('');


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
          
          <Title>Nova marca</Title>
          <form>
            <div style={{marginTop: '1rem'}}>
              <label style={{display: 'block'}}>Nome da marca</label>
              <input 
                type="text"
                name="brand"
                id="brand"
                placeholder="Digite o nome da marca"
                value={brand}
                onChange={(e)=>setIdBrand(e.target.value)}
                style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
              />
            </div>
            <div  style={{marginTop: '1rem'}}>
              <label style={{display: 'block'}}>ID da marca</label>
              <input 
                type="text"
                name="id_brand"
                id="id_brand"
                placeholder="Digite o ID da marca"
                value={idBrand}
                onChange={(e)=>setIdBrand(e.target.value)}
                style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
              />
            </div>
            <div style={{display: 'flex', gridGap: '1rem', width: '20rem'}}>
                  <Button text="Cadastrar" />
                  <Button text="Cancelar" />
                </div>
          </form>
            
        </div>
      )}
    </>
  )
}
