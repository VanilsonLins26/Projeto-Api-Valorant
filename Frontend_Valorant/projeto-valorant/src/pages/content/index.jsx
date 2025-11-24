import styles from './content.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../navbar'

function Content() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);

  const ITEMS_PER_PAGE = 12;

useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:8082/validate/getSkin", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Resposta do gateway:", data);

      // Ajuste: a lista está em data.chromas
      if (Array.isArray(data.chromas)) {
        setItems(data.chromas);
      } else {
        setItems([]);
      }
    })
    .catch((err) => {
      console.error("Erro ao buscar skins:", err);
      setItems([]);
    });
}, []);

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
