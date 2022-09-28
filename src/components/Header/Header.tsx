import React from 'react';
import styles from './Header.module.scss';
import LogoMobile from '../../assets/logo-mobile.jpg';
import Logo from '../../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { FiPhoneCall } from 'react-icons/fi';
import { FaWhatsapp, FaYoutube, FaFacebook, FaLinkedin, FaInstagram  } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { useMedia } from 'src/hooks/useMedia';
import { checkContext } from 'src/context/CheckoutContext';
import HeaderUserbox from 'src/layouts/SidebarLayout/Header/Userbox';


const Header = () => {

    const [mobileMenu, setMobileMenu] = React.useState(false);
    const mobile = useMedia('(max-width: 40rem)');
    const { login } = React.useContext(checkContext);

  return (
    <>
    {mobile && (
        <>
            <section className={styles.headerMobile}>
                <img src={LogoMobile} style={{width: '120px', height: "50px", objectFit: 'contain'}}/>
                <div className={styles.headerMobile__nav}>
                    <ul className={styles.headerMobile__nav__ul}>
                        <li><FiPhoneCall /></li>
                        <li><FaWhatsapp /></li>
                        <li><MdOutlineEmail /></li>
                    </ul>
                </div>
                <div className={styles.headerMobile__divButton}>
                    <button 
                    aria-label="Menu"
                    className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
                    onClick={()=>setMobileMenu(!mobileMenu)}
                    >
                    </button>
                </div>
            
            </section> 
            <section className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
                <img src={LogoMobile} alt="Logo - Nest Rental" style={{width: '80px', height: "50px", objectFit: 'contain'}}/>
                <ul className={styles.navMobile__menu}>
                    <Link to="/">Home</Link>
                    <Link to="/como-funciona">Como funciona</Link>
                    <Link to="/demonstracao">Demonstração</Link>
                    <Link to="/aluguel">Aluguel</Link>
                </ul>

                <ul className={styles.navMobile__menu__contact}>
                    <li><FaWhatsapp color='#fff'/><label>(11) 94352-4878</label></li>
                    <li><MdOutlineEmail color='#fff'/><label>contato@nestrental.com.br</label></li>
                </ul>
            </section>
        </>
        
    )}

    {!mobile && (
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
                    <Link to="/">Home</Link>
                    <Link to="/como-funciona">Como funciona</Link>
                    <Link to="/demonstracao">Demonstração</Link>
                    <Link to="/aluguel">Aluguel</Link>
                </ul>

                {login ? 
                <HeaderUserbox /> : 
                <div>
                    <Link to="/login">
                        <button 
                            style={{
                                background: 'rgb(18, 80, 130)',
                                padding: '.8rem',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#ddd',
                                borderRadius: '8px',
                                width:'120px'
                            }}
                        >
                            Login
                        </button>
                    </Link>
                </div>
                }
                
            </header>
        </section>
    )}
    
    </>
  )
}

export default Header;
