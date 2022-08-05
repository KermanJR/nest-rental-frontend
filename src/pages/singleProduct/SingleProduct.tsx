import React from 'react'
import Rent from './Rent';
import styles from './SingleProduct.module.scss';
import SingleProductDescription from './ProductDescription/ProductDescription';
import Ecolift70 from '../../assets/images/ecolift-70.png';
import ProductDescription from './ProductDescription/ProductDescription';
import Container from '../../components/Container/Container';

const SingleProduct = () => {
  return (
    <Container>
        <section className={styles.singleProduct}>
            <div className={styles.singleProduct__img}>
                <img src={Ecolift70}></img>
            </div>
            <Rent/>
        </section>
        <ProductDescription/>
    </Container>
  )
}
      
export default SingleProduct;
