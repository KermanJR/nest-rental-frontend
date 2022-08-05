import React from 'react';
import styles from './ProductDescription.module.scss';

const ProductDescription = () => {
  return (
    <div className={styles.productDescription}>
        <h3 className={styles.productDescription__title}>Descrição</h3>
        <div>
          <label><b>Dimensões:</b></label>
          <p>Altura: 1,94m | Largura: 0,7m | Comprimento: 1,28m |</p>

          <label><b>Produtividade:</b></label>
          <p>Altura de trabalho: 4,2m | Capacidade de carga: 150kg | Peso do equipamento: 305kg</p>
          
          <p>Simples de operar e fácil movimentação.</p>
          <p>Não utiliza baterias e óleo hidráulico, operação limpa e silenciosa.</p>
          <p>A base é robusta e equipada com travas que proporciona segurança ao operador.</p>
        </div>
    </div>
  )
}

export default ProductDescription;
