/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function SearchSerial({ data }) {
  const [query, setQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Estado para controlar a visibilidade dos resultados

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    // Filtrar os resultados com base no texto inserido
    const filteredResults = data.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults(filteredResults);

    // Mostrar a lista de resultados apenas se o campo de pesquisa não estiver vazio
    setShowResults(searchTerm !== "");
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setQuery(result);
    // Ocultar a lista de resultados quando um resultado é selecionado
    setShowResults(false);
  };

  return (
    <div className="search">
      <p>Serial:</p>
      <input
        type="text"
        placeholder="Pesquisar Serial..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowResults(true)} // Mostrar resultados quando o campo obtém o foco
        //onBlur={() => setShowResults(false)} // Ocultar resultados quando o campo perde o foco
      />
      {showResults &&
        results.length > 0 && ( // Renderizar a lista de resultados somente se showResults for verdadeiro e houver resultados
          <ul className="result-list">
            {results.map((result, index) => (
              <li
                key={index}
                onClick={() => handleResultClick(result)}
                style={{ cursor: "pointer" }}
              >
                {result}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

export default SearchSerial;
