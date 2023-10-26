import React, { useState } from 'react';

function App() {
  const [testeResponse, setTesteResponse] = useState(null);
  const [clientesResponse, setClientesResponse] = useState(null);

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
      setClientesResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Erro na chamada para /clientes:', error);
    }
  };

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
    </div>
  );
}

export default App;
