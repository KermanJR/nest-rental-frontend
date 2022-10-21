
import styles from '../Modal.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai'
import { ModalProps, ModalPropsTestEdit } from 'src/default/interfaces/Interfaces';
import { useEffect, useState } from 'react';
import React from 'react';
import Button from 'src/components/Button/Button';
import { Title } from 'src/components/Title/Title';
import { api } from 'src/api/api';
import { UserContext } from 'src/context/UserContext';


export const ShipModal = ({ openModal, setModal, data, edit}: ModalPropsTestEdit) => {


  const [editedShip, setEditedShip] = useState<string>('');
  const [newShip, setNewShip] = useState<string>('');

  const [editedNameShip, setEditedNameShip] = useState<string>(data?.nome);
  const [newNameShip, setNewNameShip] = useState<string>('');

  const [editedInitShip, setEditedInitShip] = useState<string>(data?.cep_inicio);
  const [newInitShip, setNewInitShip] = useState<string>('');

  const [editedEndShip, setEditedEndShip] = useState<string>(data?.cep_fim);
  const [newEndShip, setNewEndShip] = useState<string>('');

  const [editedValueShip, setEditedValueShip] = useState(data?.valor);
  const [newValueShip, setNewValueShip] = useState('');

  const [idShip, setIdShip] = useState<number>(data['id']);



  const [loading, setLoading] = useState<Boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  const { id_perfil } = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : 0


  //Editar marca
  async function editShipById(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    const fetchEditShip = fetch(`http://191.252.66.11:3333/api/fretes/${idShip}`, {
      headers:{
        'Content-Type': 'application/json',
      }, 
      method: 'PUT',
      body: JSON.stringify({
          "nome": editedNameShip,
          "cep_inicio": editedInitShip,
          "cep_fim": editedEndShip,
          "valor": editedValueShip
      })
    })

    const data = await fetchEditShip;
    const dataJson = await data.json();
    if(dataJson){
      setMessage('Frete editado com sucesso.')
    }
    setLoading(false);
    window.location.reload();
  }

   //Criar marca
   async function createShip(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setLoading(true);
    const fetchNewShip = fetch(`http://191.252.66.11:3333/api/fretes`, {
      headers:{
        'Content-Type': 'application/json',
      }, 
      method: 'POST',
      body: JSON.stringify({
          "nome": newNameShip,
          "cep_inicio": newInitShip,
          "cep_fim": newEndShip,
          "valor": newValueShip
      })
    })

    const data = await fetchNewShip;
    //const dataJson = await data.json();
    setMessage('Marca criada com sucesso.')
    setLoading(false);
    window.location.reload();
  }

  const {
    usuario
  } = React.useContext(UserContext);


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

          <Title>Novo endereço</Title>
          <form onSubmit={edit? editShipById: createShip}>
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block' }}>Descrição do frete</label>
              <input
                type="text"
                name="name_ship"
                id="name_ship"
                placeholder="Digite a descricao do frete"
                value={edit? editedNameShip: newNameShip}
                required
                onChange={edit? (e) => setEditedNameShip(e.target.value): (e)=>setNewNameShip(e.target.value)}
                style={{ padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block' }}>CEP de Saída</label>
              <input
                type="text"
                name="cep_init_ship"
                id="cep_init_ship"
                placeholder="Digite o cep de saída do frete"
                value={edit? editedInitShip: newInitShip}
                required
                onChange={edit? (e) => setEditedInitShip(e.target.value): (e)=>setNewInitShip(e.target.value)}
                style={{ padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block' }}>CEP de Chegada</label>
              <input
                type="text"
                name="cep_ship_end"
                id="cep_ship_end"
                placeholder="Digite o cep de chegada do frete"
                required
                value={edit? editedEndShip: newEndShip}
                onChange={edit? (e) => setEditedEndShip(e.target.value): (e)=>setNewEndShip(e.target.value)}
                style={{ padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block' }}>Valor do Frete</label>
              <input
                type="text"
                name="cep_value"
                id="cep_value"
                placeholder="R$"
                value={edit? editedValueShip: newValueShip}
                required
                onChange={edit? (e) => setEditedValueShip(e.target.value): (e)=>setNewValueShip(e.target.value)}
                style={{ padding: '.7rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
              />
            </div>



            {usuario?.id_perfil === 3? '': <div style={{ display: 'flex', gridGap: '1rem', width: '20rem' }}>
              {edit? <Button text="Editar" />: <Button text="Cadastrar"/>}
                <Button text="Cancelar" onClick={(e)=>setModal(!e.target.value)}/>
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
