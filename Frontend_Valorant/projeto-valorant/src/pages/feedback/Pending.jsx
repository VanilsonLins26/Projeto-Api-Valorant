import { Link } from 'react-router-dom';
import styles from './feedback.module.css';

export const Pending = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles.glowEffect} ${styles.glowYellow}`} />

            <div className={styles.card}>
                <div className={`${styles.iconContainer} ${styles.pending}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h1 className={styles.title}>Pagamento em Análise</h1>
                <p className={styles.message}>
                    Recebemos seu pedido de pagamento e ele está sendo processado.
                </p>

                <Link to="/" className={`${styles.button} ${styles.btnPending}`}>
                    Voltar ao Início
                </Link>
            </div>
        </div>
    );
};