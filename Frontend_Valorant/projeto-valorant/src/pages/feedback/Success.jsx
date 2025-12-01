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
            <div className={`${styles.glowEffect} ${styles.glowGreen}`} />

            <div className={styles.card}>
                <div className={`${styles.iconContainer} ${styles.success}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className={styles.title}>Pagamento Aprovado!</h1>
                <p className={styles.message}>
                    Parabéns! Sua transação foi processada com sucesso.
                    Seu acesso ao conteúdo exclusivo foi liberado.
                </p>


                <Link to="/content" className={`${styles.button} ${styles.btnSuccess}`}>
                    Finalizar
                </Link>
            </div>
        </div>
    );
};