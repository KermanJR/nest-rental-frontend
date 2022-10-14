
import styles from './ProductDescription.module.scss';

const ProductDescription = ({descricao}) => {
  return (
    <div className={styles.productDescription}>
        <h3 className={styles.productDescription__title}>Descrição</h3>
        <div dangerouslySetInnerHTML={{__html: descricao}} className={styles.productDescription__div}>
        </div>
    </div>
  )
}

export default ProductDescription;
