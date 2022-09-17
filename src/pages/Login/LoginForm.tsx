import { Title } from '../../components/Title/Title';
import styles from './LoginForm.module.scss';
import { Input } from '../../components/Input/Input';
import { useForm } from '../../hooks/useForm'
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import MachineLogin from '../../assets/images/machine-login.png'
import Logo from '../../assets/logo.jpg'

export const LoginForm = () => {

    const email = useForm("email");
    const password = useForm("password");
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
                    <div><Button>Entrar</Button></div>
                    <div><Link to="/recuperar-senha" style={{color: "rgba(18, 80, 130, 1)"}}>Esqueceu sua senha?</Link></div>
                   
                </div>
                <hr/>
                <div className={styles.loginForm__divForm__forgetPassword}>
                    <p>Você não tenha uma conta?
                        <Link to="/login/cadastro" style={{color: "rgba(18, 80, 130, 1)", fontWeight: "bold"}}> Inscreva-se</Link>
                    </p>
                    <p style={{textAlign: 'right', marginTop: '1rem'}}>Voltar ao site
                        <Link to="/" style={{color: "rgba(18, 80, 130, 1)", fontWeight: "bold"}}></Link>
                    </p>
                
                    
                </div>
                
            </div>
        </section>
    )
}
