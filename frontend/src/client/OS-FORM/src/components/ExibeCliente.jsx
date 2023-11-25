import React from "react";

const ExibeCliente = ({ data }) => {
  if (!data || !Array.isArray(data.myentities)) {
    return <div>Nenhum dado disponível</div>;
  }

  return (
    <div>
      <h2>Entidades:</h2>
      <ul>
        {data.myentities.map((entity) => (
          <li key={entity.id}>
            <p>Nome: {entity.name}</p>
            {/* Adicione outras propriedades da entidade, se necessário */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExibeCliente;
