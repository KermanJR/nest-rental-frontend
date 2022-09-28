
import styles from '../Modal.module.scss';
import  {AiFillCloseCircle} from 'react-icons/ai'
import { ModalProps } from 'src/default/interfaces/Interfaces';
import React from 'react';
import { Title } from 'src/components/Title/Title';
import { Input } from 'src/components/Input/Input';
import Button from 'src/components/Button/Button';

export const ListProductsModal = ({openModal, setModal}: ModalProps) => {
  const [razaoSocial, setRazaoSocial] = React.useState<String>('');
  return (
    <>
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modal__divCloseButton}>
          <button 
              className={styles.modal__divCloseButton__closeButton}
              onClick={(e)=>setModal(!openModal)}
            >
              <AiFillCloseCircle/>
            </button>
          </div>
          <section>
            <Title>
              Cadastre um novo produto
            </Title>
            <form>
              <Input
                placeholder='Digite o nome do produto'
                name="product_name"
                id="product_name"
                error=''
                label='Nome do Produto'
                type='text'
                onChange={(e)=>setRazaoSocial(e.target.value)}
                onBlur={(e)=>setRazaoSocial(e.target.value)}
                value={razaoSocial}
              />
              <div style={{display: 'flex', justifyContent: 'space-between', gridGap: '2rem', alignItems: 'center'}}>
                <Input
                  placeholder='R$'
                  name="price_product"
                  id="price_product"
                  error=''
                  label='Preço do Produto'
                  type='area'
                  onChange={(e)=>setRazaoSocial(e.target.value)}
                  onBlur={(e)=>setRazaoSocial(e.target.value)}
                  value={razaoSocial}
                />

                <div style={{width: '50%'}}>
                  <label style={{display: 'block'}}>
                    Selecione a categoria do produto:
                  </label>
                  <select style={{width: '100%', height: '40px', borderRadius: '8px', borderColor: '#ccc'}}>
                    <option>Produto 1</option>
                    <option>Produto 2</option>
                    <option>Produto 3</option>
                    <option>Produto 4</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{display: 'block'}}>
                  Descrição do produto
                </label>
                <div style={{display: 'flex', gridGap: '4rem'}}>

                
                <textarea rows={4} cols={80} style={{borderRadius: '8px', borderColor: '#ccc', padding: '1rem'}} placeholder="Descreva o produto">
                  
                </textarea>

                <div>
                <label style={{display: 'block'}}>
                  Imagem do produto
                </label>
                <input type="file" style={{marginTop: '8px'}} />
                </div>
              </div>
              </div>

                <div style={{display: 'flex', gridGap: '1rem', width: '20rem'}}>
                  <Button text="Cadastrar" />
                  <Button text="Cancelar" />
                </div>
            </form>
          </section>
          
            
        </div>
      )}
    </>
  )
}
