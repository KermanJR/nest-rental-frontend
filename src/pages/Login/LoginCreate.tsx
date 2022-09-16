import { Title } from '../../components/Title/Title';
import styles from './LoginForm.module.scss';
import { Input } from '../../components/Input/Input';
import { useForm } from '../../hooks/useForm'
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import MachineLogin from '../../assets/images/machine-login.png';
import React from 'react';

export const LoginCreate = () => {

    const cnpj = useForm("cnpj");
    const [fantasyName, setFantasyName] = React.useState<string>('');
    const [corporateName, setCorporateName] = React.useState<string>('');

    return (
        <section className={styles.loginForm}>
            <div className={styles.loginForm__background}>
                <img src={MachineLogin}/>
            </div>
            <div className={styles.loginForm__divForm}>
                <Title>Crie sua conta</Title>
                <form>
                    <Input
                        label="Razão social:"
                        type="text"
                        name="corporate_name"
                        id="corporate_name"
                        placeholder=""
                        onBlur={(e)=>setCorporateName(e.target.value)}
                        onChange={(e)=>setCorporateName(e.target.value)}
                        value={corporateName}
                        error=""

                    />

                    <Input
                        label="Nome Fantasia:"
                        type="text"
                        name="fantasy_name"
                        id=""
                        placeholder=""
                        onChange={(e)=>setFantasyName(e.target.value)}
                        onBlur={(e)=>setFantasyName(e.target.value)}
                        value={fantasyName}
                        error=""
                
                    />
                    <Input
                        label="CNPJ:"
                        type="text"
                        name="user_cnpj"
                        id="user_cnpj"
                        placeholder="00.000.000/0000-00"
                        {...cnpj}
                 
                    />
                </form>
                <div className={styles.loginForm__divForm__recoveryPassword}>
                    <Button>Entrar</Button>
                </div>
                <hr/>
                <div className={styles.loginForm__divForm__forgetPassword}>
                    <p>Já possui uma conta?<Link to="/login"> Entrar</Link></p>
                    
                </div>
                
            </div>
        </section>
    )
}
