import { Title } from '../../components/Title/Title';
import React, { FormEvent } from 'react';
import styles from './LoginForm.module.scss';
import { Input } from 'src/components/Input/Input';
import { useForm } from 'src/hooks/useForm';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import MachineLogin from '../../assets/images/machine-login.png'
import Logo from '../../assets/logo.jpg'
import { checkContext } from 'src/context/CheckoutContext';
import { Navigate } from 'react-router-dom';

export const LoginForm = () => {


    const navigate = useNavigate();
    const email = useForm("email");
    const password = useForm("password");
    const [loginError, setLoginError] = React.useState<String>('');

    const {login, setLogin} = React.useContext(checkContext);
    console.log(login)
    const handleSubmit = (e: any)=>{
        e.preventDefault();
        console.log(e)
        if(password.value && email.value){
            console.log(!login)
            setLogin(!login);
            navigate('/dashboard/geral')
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

                    <Input
                        label="Senha:"
                        type="password"
                        name="user_password"
                        id="user_password"
                        placeholder="Digite sua senha"
                       {...password}
                    />
                </form>
                <div className={styles.loginForm__divForm__recoveryPassword}>
                    <div><input type="submit" value="Entrar" onClick={handleSubmit}/></div>
                    <div><Link to="/recuperar-senha" style={{color: "rgba(18, 80, 130, 1)"}}>Esqueceu sua senha?</Link></div>
                   
                </div>
                <hr/>
                <div className={styles.loginForm__divForm__forgetPassword}>
                    <p>Você não tenha uma conta?
                        <Link to="/cadastro" style={{color: "rgba(18, 80, 130, 1)", fontWeight: "bold"}}> Inscreva-se</Link>
                    </p>
                    <p style={{textAlign: 'right', marginTop: '1rem'}}>Voltar ao site
                        <Link to="/" style={{color: "rgba(18, 80, 130, 1)", fontWeight: "bold"}}></Link>
                    </p>
                
                    
                </div>
                {loginError && (
                    <p>{loginError}</p>
                )}
            </div>
        </section>
    )
}
