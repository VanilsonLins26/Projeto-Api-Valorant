import styles from './content.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../navbar'
import api from '../../services/api' // <--- IMPORTAR AXIOS (api)

function Content() {
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);

    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        const token = localStorage.getItem("token");

        // --- CORREÇÃO AQUI: USAR O AXIOS (api) ---
        api.get("/validate/getSkin", { // <-- Usamos api.get e a rota relativa
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                // Axios coloca a resposta JSON em .data
                console.log("Resposta do gateway:", response.data);

                // Ajuste: a lista está em data.chromas
                if (Array.isArray(response.data.chromas)) {
                    setItems(response.data.chromas);
                } else {
                    setItems([]);
                }
            })
            .catch((err) => {
                // O erro 'io exception' ou '401' deve ser tratado aqui
                console.error("Erro ao buscar skins:", err);
                setItems([]);
                // Você pode adicionar um redirecionamento se o token for inválido
                if (err.response && err.response.status === 401) {
                    // navigate('/login');
                }
            });
    }, []);
    // ... (o resto do código de paginação e renderização continua igual)

    const lastIndex = currentPage * ITEMS_PER_PAGE;
    const firstIndex = lastIndex - ITEMS_PER_PAGE;
    const currentItems = items.slice(firstIndex, lastIndex);

    const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

    return (
        <div className={styles.container}>
            <Navbar />

            <div className={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className={styles.pageButton}
                >
                    ◀ Anterior
                </button>

                <span className={styles.pageInfo}>
          Página {currentPage} de {totalPages}
        </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className={styles.pageButton}
                >
                    Próxima ▶
                </button>
            </div>

            <div className={styles.grid}>
                {currentItems.map((item) => (
                    <div key={item.uuid} className={styles.card}>
                        <img
                            src={item.fullRender}
                            alt={item.displayName}
                            className={styles.image}
                        />
                        <h3 className={styles.cardTitle}>{item.displayName}</h3>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Content;