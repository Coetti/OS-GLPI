import SearchClientes from "./SearchClientes";
import FormCliente from "./FormCliente";
import { useState } from "react";

const FormVisita = () => {
  const clientesArray = ["Gabriel", "Maria", "Queria", "Rafael"] || [];
  const [cadastrarCliente, setCadastrarCliente] = useState(false);

  const handleCadastrarClick = () => {
    if (cadastrarCliente === true) {
      setCadastrarCliente(false);
    } else {
      setCadastrarCliente(true);
    }
  };

  return (
    <div className="form">
      <SearchClientes data={clientesArray} />
      <button onClick={handleCadastrarClick}>+</button>
      {cadastrarCliente === true && <FormCliente />}
    </div>
  );
};

export default FormVisita;
