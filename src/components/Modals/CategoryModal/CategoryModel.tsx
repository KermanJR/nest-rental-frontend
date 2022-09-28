
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { ModalProps } from 'src/default/interfaces/Interfaces';

export const CategoryModal = ({openModal, setModal}: ModalProps) => {
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
          
            
        </div>
      )}
    </>
  )
}
