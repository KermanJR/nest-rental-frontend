import { Title } from '../../components/Title/Title';
import styles from './LoginForm.module.scss';
import { Input } from '../../components/Input/Input';
import { useForm } from '../../hooks/useForm'
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import MachineLogin from '../../assets/images/machine-login.png'

export const LoginForm = () => {

    const email = useForm("email");
    const password = useForm("password");
    return (
        <section className={styles.loginForm}>
            <div className={styles.loginForm__background}>
                <img src={MachineLogin}/>
            </div>
            <div className={styles.loginForm__divForm}>
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
                    <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
                    <Button>Entrar</Button>
                </div>
                <hr/>
                <div className={styles.loginForm__divForm__forgetPassword}>
                    <p>Você não tenha uma conta?<Link to="/cadastro"> Inscreva-se</Link></p>
                    
                </div>
                
            </div>
        </section>
    )
}
