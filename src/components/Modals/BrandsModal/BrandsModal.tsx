
import styles from '../Modal.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai'
import { ModalProps, ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';
import { useEffect, useState } from 'react';
import Button from 'src/components/Button/Button';
import { Title } from 'src/components/Title/Title';
import { api } from 'src/api/api';


export const BrandsModal = ({ openModal, setModal, data, edit}: ModalPropsTestEdit) => {


  const [editedBrand, setEditedBrand] = useState<string>('');
  const [newBrand, setNewBrand] = useState<string>('');
  const [idBrand, setIdBrand] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  const { id_perfil } = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : 0
  //Editar marca
  async function editBrandById(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    const teste = fetch(`https://nest-rental-backend.herokuapp.com/api/marcas/${idBrand}`, {
      headers:{
        'Content-Type': 'application/json',
      }, 
      method: 'POST',
      body: JSON.stringify({
          "nome": editedBrand 
      })
    })

    const data = await teste;
    const dataJson = await data.json();
    console.log(dataJson)
    if(dataJson){
      setMessage('Marca editada com sucesso.')
    }
    setLoading(false);
    //window.location.reload();
  }

   //Editar marca
   async function createBrand(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    const teste = fetch(`https://nest-rental-backend.herokuapp.com/api/marcas`, {
      headers:{
        'Content-Type': 'application/json',
      }, 
      method: 'POST',
      body: JSON.stringify({
          "nome": newBrand,
          "identificador": "???"
      })
    })

    const data = await teste;
    //const dataJson = await data.json();
    setMessage('Marca criada com sucesso.')
    setLoading(false);
    window.location.reload();
  }

  /*useEffect(()=>{
    if(data){
      setBrand(data.nome);
      setIdBrand(data.identificador);
    }
  }, [data]);*/


  /*function cadastrar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (data?.id != null) {
      api.put(`/marcas/${data.id}`, { nome: brand, identificador: idBrand });
    } else {
      api.post("/marcas", { nome: brand, identificador: idBrand });
    }

    setModal(false);
  }*/

  return (
    <>
      {openModal && (
        <div className={styles.modalCategory}>
          <div className={styles.modal__divCloseButton}>
            <button
              className={styles.modal__divCloseButton__closeButton}
              onClick={(e) => setModal(!openModal)}
            >
              <AiFillCloseCircle />
            </button>
          </div>

          <Title>Nova marca</Title>
          <form onSubmit={edit? editBrandById: createBrand}>
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block' }}>Nome da marca</label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Digite o nome da marca"
                value={edit? editedBrand: newBrand}
                onChange={edit? (e) => setEditedBrand(e.target.value): (e)=>setNewBrand(e.target.value)}
                style={{ padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
              />
            </div>
            {id_perfil === 3? '': <div style={{ display: 'flex', gridGap: '1rem', width: '20rem' }}>
                <Button text="Editar" /> <Button text="Cadastrar" />
                <Button text="Cancelar" />
              </div>
            }
            <div>

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
            </div>
          </form>

        </div>
      )}
    </>
  )
}
