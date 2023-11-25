import SearchClientes from "./SearchClientes";
import SearchSerial from "./SearchSerial";
import FormCliente from "./FormCliente";
import TipoItem from "./TipoItem";
import DataFetcher from "./DataFetcher";
import { useState } from "react";
import Problem from "./Problem";

const FormLab = () => {
  const [cadastrarCliente, setCadastrarCliente] = useState(false);

  const handleCadastrarClick = () => {
    if (cadastrarCliente === true) {
      setCadastrarCliente(false);
    } else {
      setCadastrarCliente(true);
    }
  };

  const [cadastrarItem, setCadastrarItem] = useState(false);

  const handleCadastrarItemClick = () => {
    if (cadastrarItem === true) {
      setCadastrarItem(false);
    } else {
      setCadastrarItem(true);
    }
  };

  return (
    <DataFetcher>
      {({ clientesNome, allItems, responseData }) => {
        return (
          <div className="form">
            <SearchClientes data={clientesNome} responseData={responseData} />
            <button onClick={handleCadastrarClick}>+</button>
            {cadastrarCliente === true && <FormCliente />}
            <SearchSerial data={allItems} />
            <button onClick={handleCadastrarItemClick}>+</button>
            {cadastrarItem === true && <TipoItem />}
            <Problem className="problem" />
          </div>
        );
      }}
    </DataFetcher>
  );
};

export default FormLab;
