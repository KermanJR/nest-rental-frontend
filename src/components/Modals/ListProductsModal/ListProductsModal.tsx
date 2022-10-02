
import styles from '../Modal.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai'
import { ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';
import React, { useEffect } from 'react';
import { Title } from 'src/components/Title/Title';
import { Input } from 'src/components/Input/Input';
import Button from 'src/components/Button/Button';
import { Categoria } from 'src/models/crypto_order';
import { api } from 'src/api/api';
import { useState } from 'react';

export const ListProductsModal = ({ openModal, setModal, data, edit }: ModalPropsTestEdit) => {


  const [nameProduct, setNameProduct] = React.useState<string>('');
  const [priceProduct, setPriceProduct] = React.useState<string>('');
  const [categoryProduct, setCategoryProduct] = React.useState<string>('');
  const [descriptionProduct, setDescriptionProduct] = React.useState<string>('');

  const [categories, setCategories] = useState<Categoria[]>([]);

  async function queryCategories() {
    setCategories(null)
    const { data } = await api.get(`/categorias`);
    if (data) {
      setCategories(data);
    } else {
      setCategories(null);
    }
  }

  React.useEffect(() => {
    queryCategories()
  }, [])

  useEffect(() => {
    console.log(data);
    if (data) {
      setNameProduct(data?.nome || "");
      setPriceProduct(data?.valor || "");
      setDescriptionProduct(data?.descricao || "");
    }
  }, [data]);

  async function salvar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const info = {
      "descricao": descriptionProduct,
      "nome": nameProduct,
      "fabricante": "?????",
      "valor": parseFloat(priceProduct),
      "vr_desconto": 0,
      "id_categoria": 1
    };

    if (data?.id != null) {
      await api.put(`produtos/${data.id}`, info);
    } else {
      await api.post("produtos", info);
    }
  }


  return (
    <>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modal__divCloseButton}>
            <button
              className={styles.modal__divCloseButton__closeButton}
              onClick={(e) => setModal(!openModal)}
            >
              <AiFillCloseCircle />
            </button>
          </div>
          <section>
            <Title>
              {edit ? "Produto" : "Cadastre um novo produto"}
            </Title>
            <form onSubmit={salvar}>
              <Input
                placeholder='Digite o nome do produto'
                name="product_name"
                id="product_name"
                error=''
                label='Nome do Produto'
                type='text'
                onChange={(e) => setNameProduct(e.target.value)}
                onBlur={(e) => setNameProduct(e.target.value)}
                value={nameProduct}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', gridGap: '2rem', alignItems: 'center' }}>
                <Input
                  placeholder='R$'
                  name="price_product"
                  id="price_product"
                  error=''
                  label='Preço do Produto'
                  type='area'
                  onChange={(e) => setPriceProduct(e.target.value)}
                  onBlur={(e) => setPriceProduct(e.target.value)}

                  //@ts-ignore
                  //value={priceProduct.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                  value={priceProduct}
                />

                {!edit ?
                  <div style={{ width: '50%' }}>
                    <label style={{ display: 'block' }}>
                      Selecione a categoria do produto:
                    </label>

                    {categories &&
                      <select style={{ width: '100%', height: '40px', borderRadius: '8px', borderColor: '#ccc' }}>
                        {categories.map((item, index) => {
                          return <>
                            <option value={item.id} key={item.id}>{item.descricao}</option>
                          </>

                        })}
                      </select>
                    }
                  </div> : ""
                }
              </div>

              <div>
                <label style={{ display: 'block', marginTop: "1rem" }}>
                  Descrição do produto
                </label>
                <div style={{ display: 'flex', gridGap: '4rem' }}>
                  <textarea rows={4} cols={80} style={{ borderRadius: '8px', borderColor: '#ccc', padding: '1rem' }} placeholder="Descreva o produto"  defaultValue={descriptionProduct} onChange={(e) => setDescriptionProduct(e.target.value)}>

                  </textarea>

                  {!edit ?
                    <div>
                      <label style={{ display: 'block' }}>
                        Imagem do produto
                      </label>
                      <input type="file" style={{ marginTop: '8px' }} />
                    </div> :
                    <img src={data.prod_image} alt="" style={{ width: "20rem", height: "20rem" }} />
                  }

                </div>
              </div>

              <div style={{ display: 'flex', gridGap: '1rem', width: '20rem' }}>
                {edit ? <Button text="Editar" /> : <Button text="Cadastrar" />}

                <Button text="Cancelar" />
              </div>
            </form>
          </section>


        </div>
      )}
    </>
  )
}
