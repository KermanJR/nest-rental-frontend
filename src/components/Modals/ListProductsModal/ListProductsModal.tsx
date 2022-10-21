
import styles from '../Modal.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai'
import { ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';
import React, { useEffect } from 'react';
import { Title } from 'src/components/Title/Title';
import Button from 'src/components/Button/Button';
import { Categoria, Marca } from 'src/models/crypto_order';
import { api } from 'src/api/api';
import { Input } from 'src/components/Input/Input';
import { useState } from 'react';


export const ListProductsModal = ({ openModal, setModal, data, edit }: ModalPropsTestEdit) => {

  console.log(data)
  console.log(edit)

  const [editedNameProduct, setEditedNameProduct] = React.useState<string>(data[0]?.nome);
  const [newNameProduct, setNewNameProduct] = useState<string>("");

  const [editedFabricProduct, setEditedFabricProduct] = React.useState<string>(data[0]?.fabricante);
  const [newFabricProduct, setNewFabricProduct] = React.useState<string>('');

  const [editedDescriptionProduct, setEditedDescriptionProduct] = useState<string>(data[0]?.descricao);
  const [newDescriptionProduct, setNewDescriptionProduct] = useState<string>("");


  const [editedValueProduct, setEditedValueProduct] = useState<string>(data[0]?.valor);
  const [newValueProduct, setNewValueProduct] = useState<string>("");

  const [editedCategoryProduct, setEditedCategoryProduct] = useState<string>(data[0]?.categoria?.descricao);
  const [newCategoryProduct, setNewCategoryProduct] = useState<string>("");

  const [editedImageProduct, setEditedImageProduct] = useState(data[0]?.prod_image);
  const [newImageProduct, setNewImageProduct] = useState(null);

  const [idProduct, setIdProduct] = useState<string>(data[0]?.id);

  const [loading, setLoading] = useState<Boolean>(false);
  const [message, setMessage] = useState<string>('');

  const [categories, setCategories] = useState<Categoria[]>([]);
  const [brands, setBrands] = useState<Marca[]>([]);

  async function queryCategories() {
    setCategories(null)
    const { data } = await api.get(`/categorias`);
    if (data) {
      setCategories(data);
    } else {
      setCategories(null);
    }
  }

  async function queryBrands(){
    const {data} = await api.get("/marcas");
    setBrands(data);
  }

  

  React.useEffect(() => {
    queryCategories();
    queryBrands();
  }, [])
  
  const { id_perfil } = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : 0

  async function salvar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const info = {
      "descricao": newDescriptionProduct,
      "nome": newNameProduct,
      "fabricante": "?????",
      "valor": parseFloat(newValueProduct),
      "vr_desconto": 0,
      "id_categoria": 1
    };

    if (data?.id != null) {
      await api.put(`produtos/${data.id}`, info);
    } else {
      await api.post("produtos", info);
    }
  }



   //editar produto 
   async function editProductById(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    const teste = fetch(`http://191.252.66.11:3333/api/produtos/${idProduct}`, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiJ9.eyJkYXRhIjp7InVzZXJJZCI6NCwidXNlciI6e319LCJpYXQiOjE2NjU4NDcxNjUsImV4cCI6MTY2NjI3OTE2NX0.IPlQWFD-eACGxXbYsgxThkV9Zh-WhUO_vJs6b-GDeFS_kl8PzJtKRs90pYhnkFSxnKb57NxhgSEQnvLOQ6bQh_I88PyiGtNa9heuTc9_DUxo3VAyzlTaefdmAoZzhaso0ZEb3OHnZPJXdQZ3h1VPHzOnAUfX2h3n0GyM_Hh5qTkPqDStAURv3Hd_z0W-HYTytmJWprM22xGamD70UCnC8cTKj4dxEDn55jUJiCVxQMyNmM9gREcXjjxd3GL_Drfx5IE1qQ8iHR4McMd7JoDVczLd2FT3yzLL9AwIjn4YS5wnWoBTML263Ea4ecgjFGsBP60b6LfM5FMdc_Zvefx_mHWC5gxtfHzx2qvElO3kUY-pvo5hpEduR-Q5M3z1Avp4zeY7yBh0CB734yn_ZX-HWBoRkVBMyCldsXYOWvgOZR6sdbVEVzzr4yoDl2nNoxpwSKAQhOlLHMeIfA2tzbFxWpkZXH32ZNH_5ZhFfuqPLIdVDz7twG5tBib98UBCUFF8d9mAcU3TrYFWD__ziah9yMkVeJmWiGVHKKo9v1OeYFUdjnE3AILQ06c6ASSsk9xsSEpx5y6CeghDUkHI1MzqnyL4THeWXVUP05UkuPXPl3lOobe1vFqL7u8MJdarYAcYvy7aoiDUqZNpfdMbSivSLRkJJWvNxOIjx2l-8nvWKw4`
      }, 
      method: 'PUT',
      body: JSON.stringify({
          "nome": editedNameProduct,
          "descricao": editedDescriptionProduct,
          "valor": editedValueProduct,
          "categoria": editedCategoryProduct,
          "fabricante": editedFabricProduct,
          "prod_image": editedImageProduct
 
      })
    })

    const data = await teste;
    const dataJson = await data.json();
    if(dataJson){
      setMessage('Produto editado com sucesso.')
    }
    setLoading(false)
    window.location.reload();
  }




  //Criar produto 
  async function CreateProduct(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    let formData = new FormData();
   // formData.append("nome", newNameProduct);
    //formData.append("nome", newNameProduct);
    //formData.append("nome", newNameProduct);
    //formData.append("nome", newNameProduct);
    //formData.append("nome", newNameProduct);
    const teste = fetch(`http://191.252.66.11:3333/api/produtos`, {
      headers:{
        'Content-Type': 'application/json',
      }, 
      method: 'POST',
      body: JSON.stringify({
        "nome": newNameProduct,
        "descricao": newDescriptionProduct,
        "fabricante": newFabricProduct,
        "valor": parseFloat(newValueProduct),
        "id_categoria": newCategoryProduct,
        "prod_image": newImageProduct
 
      })
    })

    const data = await teste;
    const dataJson = await data.json();
    if(dataJson){
      setMessage('Produto criado com sucesso.')
    }
    setLoading(false)
    window.location.reload();
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
            <form onSubmit={edit ? editProductById: CreateProduct}>
              <div style={{marginTop: '1rem'}}>
                <label style={{display: 'block'}}>Nome do produto</label>
                <input 
                  type="text"
                  name="name_product"
                  id="name_product"
                  placeholder="Digite o nome do produto"
                  value={edit? editedNameProduct: newNameProduct}
                  onChange={
                    edit? (e)=>setEditedNameProduct(e.target.value): (e)=>setNewNameProduct(e.target.value)}
                  style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
                />
              </div>

              <div style={{marginTop: '1rem'}}>
                <label style={{display: 'block'}}>Valor do produto</label>
                <input 
                  type="text"
                  name="value_product"
                  id="value_product"
                  placeholder="R$"
                  value={edit? editedValueProduct: newValueProduct}
                  onChange={
                    edit? (e)=>setEditedValueProduct(e.target.value): (e)=>setNewValueProduct(e.target.value)}
                  style={{padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%'}}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gridGap: '2rem', alignItems: 'center' }}>
               
                  <div style={{ width: '50%', marginTop: '1rem' }}>
                    <label style={{ display: 'block' }}>
                      Selecione a marca do produto:
                    </label>

                    {brands &&
                      <select
                        onChange={edit? (e)=>setEditedFabricProduct(e.target.value): (e)=>setNewFabricProduct(e.target.value)}
                        value={edit? editedFabricProduct: newFabricProduct} 
                        style={{ width: '100%', height: '40px', borderRadius: '8px', borderColor: '#ccc' }}>
                        {brands.map((item, index) => {
                          return <>
                            <option value={item.nome} key={item.id}>{item.nome}</option>
                          </>

                        })}
                      </select>
                    }
                  </div>

                  <div style={{ width: '50%', marginTop: '1rem' }}>
                    <label style={{ display: 'block' }}>
                      Selecione a categoria do produto:
                    </label>

                    {categories &&
                      <select
                        onChange={edit? (e)=>setEditedCategoryProduct(e.target.value): (e)=>setNewCategoryProduct(e.target.value)}
                        value={edit? editedCategoryProduct: newCategoryProduct} 
                        style={{ width: '100%', height: '40px', borderRadius: '8px', borderColor: '#ccc' }}>
                        {categories.map((item, index) => {
                          return <>
                            <option value={item.id} key={item.id}>{item.descricao}</option>
                          </>

                        })}
                      </select>
                    }
                  </div>
                
              </div>

              <div>
                <label style={{ display: 'block', marginTop: "1rem" }}>
                  Descrição do produto
                </label>
                <div style={{ display: 'flex', gridGap: '4rem' }}>
                  <textarea rows={4} cols={80} style={{ borderRadius: '8px', borderColor: '#ccc', padding: '1rem' }} 
                    placeholder="Descreva o produto"  
                    value={edit? editedDescriptionProduct : newDescriptionProduct} 
                    onChange={edit ? (e) => setEditedDescriptionProduct(e.target.value): (e)=>setNewDescriptionProduct(e.target.value)}>
                  </textarea>

                  {!edit ?
                    <div>
                      <label style={{ display: 'block' }}>
                        Imagem do produto
                      </label>
                      <input type="file" style={{ marginTop: '8px' }}
                       value={edit? editedImageProduct: newImageProduct}
                       onChange={edit? (e)=>setEditedImageProduct(e.target.value): (e)=>setNewImageProduct(e.target.value)}
                      />
                    </div> :
                    <img src={editedImageProduct} alt="" style={{ width: "20rem", height: "20rem" }} />
                  }

                </div>
              </div>

              

              {id_perfil === 3? '': <div style={{ display: 'flex', gridGap: '1rem', width: '20rem' }}>
                {edit ? <Button text="Editar" /> : <Button text="Cadastrar" />}
                <Button text="Cancelar" />
              </div>
              }
              {loading && (             
                <svg  version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="40px" height="40px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" xmlSpace="preserve" style={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    marginTop: '10px'
                  }}>
                <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                  s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                  c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                  C22.32,8.481,24.301,9.057,26.013,10.047z">
                  <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="0.5s"
                    repeatCount="indefinite"/>
                  </path>
                </svg>

              )}

              {!loading && (
                <p style={{color: 'green'}}>{message}</p>
              )}
            </form>
          </section>


        </div>
      )}
    </>
  )
}
