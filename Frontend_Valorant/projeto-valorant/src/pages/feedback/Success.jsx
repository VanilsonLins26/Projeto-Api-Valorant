import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './feedback.module.css';

export const Success = () => {
    const navigate = useNavigate();


    useEffect(() => {

        localStorage.setItem('isPremium', 'true');



    }, [navigate]);

    return (
        <div className={styles.container}>

            <div className={styles.card}>


                <Link to="/content" className={`${styles.button} ${styles.btnSuccess}`}>
                    Acessar Conteúdo
                </Link>
            </div>
        </div>
    );
};