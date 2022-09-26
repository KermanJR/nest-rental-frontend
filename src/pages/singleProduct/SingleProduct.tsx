import React from 'react'
import Rent from './Rent';
import styles from './SingleProduct.module.scss';
import Ecolift70 from '../../assets/images/ecolift-70.png';
import ProductDescription from './ProductDescription/ProductDescription';
import Container from '../../components/Container/Container';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';

const SingleProduct = () => {
  return (
    <>
      <Header/>
      <section style={{
        backgroundColor: "#125082",
        padding: "1rem 5rem",
        height: "150px",
        display: "flex",
        alignItems: "center"
      }}>
        <h1 style={{
          color:"#fff",
          textTransform: "uppercase"
        }}>Ecolift 50</h1>

      </section>
      <Container>
        <section className={styles.singleProduct}>
            <div className={styles.singleProduct__img}>
                <img src={Ecolift70}></img>
            </div>
            <Rent/>
        </section>
        <ProductDescription/>
      </Container>
      <Footer/>
    </>
  )
}
      
export default SingleProduct;
