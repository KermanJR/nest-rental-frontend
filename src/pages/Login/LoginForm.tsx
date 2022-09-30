import { Title } from '../../components/Title/Title';
import React, { FormEvent } from 'react';
import styles from './LoginForm.module.scss';
import { Input } from 'src/components/Input/Input';
import { useForm } from 'src/hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import MachineLogin from '../../assets/images/machine-login.png'
import Logo from '../../assets/logo.jpg'
import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { logar, api } from 'src/api/api';

export const LoginForm = () => {



    const email = useForm("email");
    const [password, setPassword] = React.useState<string>("")
    const [loginError, setLoginError] = React.useState<String>('');


    const {
        userLogin,
        error
    } = useContext(UserContext);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (password) {
            userLogin(email.value, password);
        }
    }


    return (
        <section className={styles.loginForm}>
            <div className={styles.loginForm__background}>
                <img src={MachineLogin}/>
            </div>
            <div className={styles.loginForm__divForm}>
                <img src={Logo}/>
                <Title>Bem vindo de volta!</Title>
                <form>
                    <Input
                        label="E-mail:"
                        type="text"
                        name="user_email"
                        id="userEmail"
                        placeholder="Digite seu email"
                       {...email}
                    />
                    <label style={{display: "block"}}>Senha:</label>
                    <input 
                        type="password"
                        value={password}
                        name="password"
                        id="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        style={{width: "100%", padding: ".7rem", border: "1px solid #ccc", borderRadius: "8px"}}
                    />
                </form>
                {error && (
                    <p style={{color: 'red', fontSize: '.7rem'}}>{error}</p>
                )}
                <div className={styles.loginForm__divForm__recoveryPassword}>
                    <div><input  style={{
                            backgroundColor: 'rgba(18, 80, 130)',
                            padding: '1rem',
                            width: '100%',
                            height: '50px',
                            borderRadius: '9px',
                            border: 'none',
                            color: '#fff',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            marginTop: '2rem',
                            boxShadow: '1px 2px 5px 2px #ccc'}}
                            type="submit"
                            value="Entrar"
                            onClick={handleSubmit}
                        />
                    </div>
                    <div><Link to="/recuperar-senha" style={{color: "rgba(18, 80, 130, 1)"}}>Esqueceu sua senha?</Link></div>
                   
                </div>
                <hr/>
                <div className={styles.loginForm__divForm__forgetPassword}>
                    <p>Você não tenha uma conta?
                        <Link to="/cadastro" style={{color: "rgba(18, 80, 130, 1)", fontWeight: "bold"}}> Inscreva-se</Link>
                    </p>
                    <p style={{textAlign: 'right', marginTop: '1rem'}}>
                        <Link to="/" style={{color: "rgba(18, 80, 130, 1)", fontWeight: "bold"}}>Voltar ao site</Link>
                    </p>
                
                    
                </div>
                {loginError && (
                    <p>{loginError}</p>
                )}
            </div>
        </section>
    )
}
