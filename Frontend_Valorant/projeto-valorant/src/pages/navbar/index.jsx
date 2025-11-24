import styles from './navbar.module.css'
import logo from '../../assets/valorantpng1.png';
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import api from '../../services/api'

function Navbar() {
  
  async function logout(){
    localStorage.removeItem("token");
  }

  return (
      <nav className={styles.header}> 
        <div className={styles.headerDiv}>
          <img src={logo} className={styles.logo}/>
          <h3>Skins</h3>
          <Link to={"/Login"} className={styles.logout} onClick={logout}>
            <h3 className={styles.logoutTitle}>Logout</h3>
          </Link>
        </div>
      </nav>
  )
}

export default Navbar
