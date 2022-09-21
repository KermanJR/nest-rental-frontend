
import styles from './Footer.module.scss';
import { FaWhatsapp, FaYoutube, FaFacebook, FaLinkedin, FaInstagram  } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';


const Footer = () => {

  return (
    <>
    <section className={styles.footer}>
        <div className={styles.footer__company}>
            <h4>Empresa</h4>
            <ul className={styles.footer__company__links}>
                <li><a>Início</a></li>
                <li><a>Produtos </a></li>
                <li><a>Contato</a></li>
            </ul>
        </div>

        <div className={styles.footer__contact}>
            <h4>Contato</h4>
            <ul className={styles.footer__contact__links}>
                <li><FaWhatsapp color='#fff'/><label>(11) 94352-4878</label></li>
                <li><MdOutlineEmail color='#fff'/><label>contato@nestrental.com.br</label></li>
            </ul>
        </div>

        <div className={styles.footer__attendance}>
            <h4>Atendimento</h4>
            <p>Segunda à Sexta Feira das 8:00 às 17:30</p>
            <ul className={styles.footer__attendance__links}>
                <li><a href="/"><FaFacebook size={22}/></a></li>
                <li><a href="/"><FaInstagram size={22}/></a></li>
                <li><a href="/"><FaLinkedin size={22}/></a></li>
                <li><a href="/"><FaYoutube size={22}/></a></li>
            </ul>
        </div>
    </section>
    </>
  )
}

export default Footer;
