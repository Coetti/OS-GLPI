import { useState } from "react";
import FormComputer from "./FormComputer";
import FormPrinter from "./FormPrinter";
import FormItemDiverso from "./FormItemDiverso";

const TipoItem = () => {
  const [tipoItem, setTipoItem] = useState(null);

  const changeItemForm = (e) => {
    setTipoItem(e.target.value);
  };
  return (
    <div className="selecione">
      <form>
        <p>Selecione o tipo do Item</p>
        <label>
          <input
            type="radio"
            value="0"
            id={"Computer"}
            onChange={changeItemForm}
            checked={tipoItem === "0"}
          />
          Computador
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="1"
            id={"Printer"}
            onChange={changeItemForm}
            checked={tipoItem === "1"}
          />
          Impressora
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="2"
            id={"Others"}
            onChange={changeItemForm}
            checked={tipoItem === "2"}
          />
          Diverso
        </label>
        <br />
      </form>
      {tipoItem === "0" && <FormComputer />}
      {tipoItem === "1" && <FormPrinter />}
      {tipoItem === "2" && <FormItemDiverso />}
    </div>
  );
};

export default TipoItem;
