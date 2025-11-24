import styles from './login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import api from '../../services/api'

function Login() {

  const inputEmail = useRef()
  const inputSenha = useRef()
  const navigate = useNavigate();

  async function loginUsers() {
    try {
      const response = await api.post('/auth/login', {
      email: inputEmail.current.value,
      senha: inputSenha.current.value
    })
    localStorage.setItem('token', response.data.token);
    navigate("/content")
    } catch (error) {
      console.error({ error })
    }
  }



  return (
      <div className={styles.containerLogin}>
        <form className={styles.formLogin}>
          <h1>Login</h1>
          <input name='email' placeholder='Digite seu email' type='email' ref={inputEmail}/>
          <input name='senha' placeholder='Digite sua senha' type='text'ref={inputSenha}/>
          <button className={styles.casdastrarLogin} type='button' onClick={loginUsers}>Login</button>
          <Link to={"/cadastro"} className={styles.linkLogin}>Cadastrar</Link>
        </form>
      </div>
  )
}

export default Login
