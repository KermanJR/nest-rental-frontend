import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../assets/logo.jpg';
import { Link, Routes } from 'react-router-dom';
import { FiPhoneCall } from 'react-icons/fi';
import { FaWhatsapp, FaYoutube, FaFacebook, FaLinkedin, FaInstagram  } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';


const Header = () => {
  return (
    <section className={styles.header}>
        <div className={styles.header__sub}>
             <div>
                <ul className={styles.header__sub__infos}>
                    <li><FiPhoneCall/><label>0800 555 1015</label></li>
                    <li><FaWhatsapp/><label>(11) 9 8844-6299</label></li>
                    <li><MdOutlineEmail/><label>contato@nestrental.com.br</label></li>
                </ul>
             </div>
             <div>
                <ul className={styles.header__sub__socialMedias}>
                    <li><FaYoutube size={23}/></li>
                    <li><FaFacebook size={23}/></li>
                    <li><FaLinkedin size={23}/></li>
                    <li><FaInstagram size={23}/></li>
                </ul>
             </div>
        </div>
        <header className={styles.header__main}>
            <img src={Logo} alt="Logo - Nest Rental"/>
            
            <ul className={styles.header__links}>
                <Link to="/home">Home</Link>
                <Link to="/home">Como funciona</Link>
                <Link to="/demonstracao">Demonstração</Link>
                <Link to="/home">Aluguel</Link>
            </ul>
           
           
        </header>
    </section>
  )
}

export default Header;
