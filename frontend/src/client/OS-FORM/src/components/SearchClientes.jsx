/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

function SearchClientes({ data }) {
  const [query, setQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    // Filtrar os resultados com base no texto inserido
    const filteredResults = data.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults(filteredResults);
    setSelectedResult(""); // Limpar o resultado selecionado
    // Mostrar a lista de resultados apenas se o campo de pesquisa não estiver vazio
    setShowResults(searchTerm !== "");
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setQuery(result); // Atualiza o campo de input com o valor selecionado
    // Ocultar a lista de resultados quando um resultado é selecionado
    setShowResults(false);
  };

  useEffect(() => {
    setQuery(selectedResult); // Atualiza o valor do campo de input quando selectedResult muda
  }, [selectedResult]);

  return (
    <div className="search">
      <p>Cliente:</p>
      <input
        type="text"
        placeholder="Pesquisar Cliente..."
        value={query}
        autoComplete="off"
        onChange={handleInputChange}
        onFocus={() => setShowResults(true)}
        //onBlur={() => setShowResults(false)} causa problema na seleção
      />
      {showResults && results.length > 0 && (
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

export default SearchClientes;
