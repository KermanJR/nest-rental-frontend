import React from 'react';
import styles from './ProductDescription.module.scss';

const ProductDescription = () => {
  return (
    <div className={styles.productDescription}>
        <h3 className={styles.productDescription__title}>Descrição</h3>
        <div>
          <label></label>
          <p></p>
        </div>
    </div>
  )
}

export default ProductDescription;
