import React from 'react';
import styles from './ErrorModal.module.scss';
import {AiFillCloseCircle} from 'react-icons/ai';


const ErrorModal = (props: any) =>{

    const { text, errorModal, setErrorModal } = props;

    return (
        <div className={styles.errorModal}>
            <div className={styles.modal__divCloseButton}>
                <button
                className={styles.modal__divCloseButton__closeButton}
                onClick={(e) => setErrorModal(!errorModal)}
                >
                <AiFillCloseCircle />
                </button>
            </div>
            <p>{text}</p>
        </div>
    )
}

export default ErrorModal;