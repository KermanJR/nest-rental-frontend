
import styles from './ProductDescription.module.scss';

const ProductDescription = () => {
  return (
    <div className={styles.productDescription}>
        <h3 className={styles.productDescription__title}>Descrição</h3>
        <div className={styles.productDescription__div}>
          <label>Dimensões:</label>
          <ul>
            <li>Altura: 1,94m | Largura: 0,7m | Comprimento: 1,28m |</li>
          </ul>

          <label>Produtividade:</label>
          <ul>
            <li>Altura de trabalho: 4,2m | Capacidade de carga: 150kg | Peso do equipamento: 305kg</li>
            <li>Simples de operar e fácil movimentação.</li>
            <li>Não utiliza baterias e óleo hidráulico, operação limpa e silenciosa.</li>
            <li>A base é robusta e equipada com travas que proporciona segurança ao operador.</li>
          </ul>
        </div>
    </div>
  )
}

export default ProductDescription;
