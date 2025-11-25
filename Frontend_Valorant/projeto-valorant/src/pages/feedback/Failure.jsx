import { Link } from 'react-router-dom';
import styles from './feedback.module.css';

export const Failure = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles.glowEffect} ${styles.glowRed}`} />

            <div className={styles.card}>
                <div className={`${styles.iconContainer} ${styles.failure}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h1 className={styles.title}>Pagamento Recusado</h1>
                <p className={styles.message}>
                    Ops! Não conseguimos processar o seu pagamento.
                    Verifique os dados do seu cartão ou tente outro método de pagamento.
                </p>

                <Link to="/checkout" className={`${styles.button} ${styles.btnFailure}`}>
                    Tentar Novamente
                </Link>
            </div>
        </div>
    );
};