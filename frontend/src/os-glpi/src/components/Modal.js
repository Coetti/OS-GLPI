import React, { useState } from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose }) {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]); // Adicione sua lista de resultados aqui

  const handleSearch = () => {
    // Aqui você pode implementar a lógica de pesquisa com base em 'searchText'.
    // Atualize a lista de resultados conforme necessário.
  };

  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <button className={styles['modal-close']} onClick={onClose}>
          Fechar
        </button>
        <h2>Selecione um cliente:</h2>
        <div className={styles['modal-search']}>
          <input
            type="text"
            placeholder="Digite o nome do cliente"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>
        <div className={styles['modal-results']}>
          {/* Renderize a lista de resultados aqui */}
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Modal;
