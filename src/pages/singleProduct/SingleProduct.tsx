import React, { useEffect, useState } from 'react'
import Rent from './Rent';
import styles from './SingleProduct.module.scss';
import Ecolift70 from '../../assets/images/ecolift-70.png';
import ProductDescription from './ProductDescription/ProductDescription';
import Container from '../../components/Container/Container';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import { useParams } from 'react-router';
import { api } from 'src/api/api';


//Não há busca por nome, nem campo image na API
const produtos = {
  "ecolift-50": { id: 1, imagem: Ecolift70 },
}

const SingleProduct = () => {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);

  async function carregar() {
    const idBanco = produtos[id].id;
    const { data } = await api.get(`/produtos/${idBanco}`);
    data.imagem = produtos[id].imagem;
    setProduto(data)
  }

  useEffect(() => {
    carregar();
  }, []);


  function dinheiro(v) {
    if (!v)
      return "";

    return v.toFixed(2).replace(".", ",");
  }


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
          color: "#fff",
          textTransform: "uppercase"
        }}>{produto?.nome || ""}</h1>

      </section>
      <Container>
        <section className={styles.singleProduct}>
          <div className={styles.singleProduct__img}>
            <img src={produto?.imagem}></img>
          </div>
          <Rent valor={dinheiro(produto?.valor)} />
        </section>
        <ProductDescription descricao={produto?.descricao || ""} />
      </Container>
    </>
  )
}

export default SingleProduct;
