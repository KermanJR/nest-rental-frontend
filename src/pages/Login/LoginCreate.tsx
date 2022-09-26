import { Title } from '../../components/Title/Title';
import styles from './LoginForm.module.scss';
import { Input } from 'src/components/Input/Input';
import { useForm } from 'src/hooks/useForm';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import MachineLogin from '../../assets/images/machine-login.png';
import Logo from '../../assets/logo.jpg'
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { checkContext } from 'src/context/CheckoutContext';
export const LoginCreate = () => {

    const cnpj = useForm("cnpj");
    const emailCad = useForm("email");
    const navigate = useNavigate()
    const {login, setLogin} = useContext(checkContext)
    
    const [fantasyName, setFantasyName] = React.useState<string>('');
    const [corporateName, setCorporateName] = React.useState<string>('');
    const [inscEstadual, setInscEstadual] = React.useState<string>('');

    const password = useForm('password');

    const [stepTwo, setStepTwo] = React.useState<Boolean>(false);

    const handleSubmit = (e: any)=>{
        e.preventDefault();
        console.log(e)
        if(password && fantasyName && corporateName){
            setStepTwo(!stepTwo);
        }
    }

    const handleSubmit2 = (e: any)=>{
        e.preventDefault();
        console.log(e)
        if(inscEstadual && password && emailCad.value){
            setLogin(!login)
           navigate('/dashboard/geral')
        }
    }
    

    return (
        <section className={styles.loginForm}>
            <div className={styles.loginForm__background}>
                <img src={MachineLogin}/>
            </div>
            {stepTwo && (
                <div className={styles.loginForm__divForm}>
                <img src={Logo}/>
                <form>
                    <Input
                        label="Inscrição Estadual:"
                        type="text"
                        name="insc_est"
                        id="insc_est"
                        placeholder="Digite a inscrição estadual"
                        onBlur={(e)=>setInscEstadual(e.target.value)}
                        onChange={(e)=>setInscEstadual(e.target.value)}
                        value={inscEstadual}
                        error=""
                    />

                    <Input
                        label="E-mail:"
                        type="email"
                        name="email"
                        id=""
                        placeholder="Digite o e-mail"
                        {...emailCad}
                        error=""
                
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
                    <div>
                        <input  style={{
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
                            value="Continuar"
                            onClick={handleSubmit2}
                            
                        />
                    </div>
                </div>
                <hr/>
                <div className={styles.loginForm__divForm__forgetPassword}>
                    <p>Já possui uma conta?<Link to="/login" style={{fontWeight: "bold", color: "rgba(18, 80, 130, 1)"}}> Entrar</Link></p>
                    <p style={{textAlign: 'right', marginTop: '1rem'}}>
                        <Link to="/" style={{color: "rgba(18, 80, 130, 1)", fontWeight: "bold"}}>Voltar ao site</Link>
                    </p>
                </div>
            </div>
            )}

            {!stepTwo && (
            <div className={styles.loginForm__divForm}>
                <img src={Logo}/>
                <Title>Crie sua conta</Title>
                <form>
                    <Input
                        label="Razão social:"
                        type="text"
                        name="corporate_name"
                        id="corporate_name"
                        placeholder="Digite a razão social"
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
                        placeholder="Digite o nome fantasia"
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
                    <div>
                        <input  style={{
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
                            onClick={handleSubmit}
                            value="Continuar"
                            
                        />
                    </div>
                </div>
                <hr/>
                <div className={styles.loginForm__divForm__forgetPassword}>
                    <p>Já possui uma conta?<Link to="/login" style={{fontWeight: "bold", color: "rgba(18, 80, 130, 1)"}}> Entrar</Link></p>
                    <p style={{textAlign: 'right', marginTop: '1rem'}}>
                        <Link to="/" style={{color: "rgba(18, 80, 130, 1)", fontWeight: "bold"}}>Voltar ao site</Link>
                    </p>
                </div>
            </div>
            )}
        </section>
    )
}
