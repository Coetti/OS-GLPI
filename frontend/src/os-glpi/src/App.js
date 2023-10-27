import React, { useState } from 'react';
import DropdownList from './components/DropdownList';
import './components-styles/DropdownList.css' ; 

function App() {
  const [testeResponse, setTesteResponse] = useState(null);
  const [clientesResponse, setClientesResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState(''); // Inicialize com uma string vazia

  const handleTesteButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:8081/initSession');
      const data = await response.json();
      setTesteResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Erro na chamada para /teste:', error);
    }
  };

  const handleClientesButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:8081/clientes');
      const data = await response.json();
      const clientes = JSON.parse(response);
      console.log(clientes);
      setClientesResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Erro na chamada para /clientes:', error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Substitua yourOptionsArray com suas opções reais
  const yourOptionsArray = [
    { id: 1, label: 'Opção 1' },
    { id: 2, label: 'Opção 2' },
    { id: 3, label: 'Opção 3' },
    // Adicione mais opções conforme necessário
  ];

  return (
    <div>
      <button onClick={handleTesteButtonClick}>Chamar /initSession</button>
      <button onClick={handleClientesButtonClick}>Chamar /clientes</button>

      {testeResponse && (
        <div>
          <h2>Resposta de /initSession:</h2>
          <pre>{testeResponse}</pre>
        </div>
      )}

      {clientesResponse && (
        <div>
          <h2>Resposta de /clientes:</h2>
          <pre>{clientesResponse}</pre>
        </div>
      )}

      <DropdownList
        options={yourOptionsArray}
        selectedOption={selectedOption}
        onSelect={handleOptionSelect}
      />
    </div>
  );
}

export default App;

