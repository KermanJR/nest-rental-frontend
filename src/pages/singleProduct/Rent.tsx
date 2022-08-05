import React from 'react';
import Button from '../../components/Button/Button';
import styles from './Rent.module.scss';


const Rent = () => {
  return (
    <div className={styles.rent}>
        <p className={styles.rent__price}>R$ 239,00/dia</p>
        <p className={styles.rent__title}>Escolha o período de locação</p>
        <form className={styles.rent__form}>
            <div className={styles.rent__form__date}>
                <div>
                    <label htmlFor="start">início</label>
                    <input type="date" name="start" />
                </div>
                <div>
                    <label htmlFor="end">Devolução</label>
                    <input type="date" name="end" />
                </div>
            </div>
            <div className={styles.rent__form__calc}>
                <label>Calcule o frete:</label>
                <input type="text"/>
            </div>
            <Button>Alugar</Button>
        </form>
    </div> 
  )
}

export default Rent;
