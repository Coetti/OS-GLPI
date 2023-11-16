import { useState } from "react";
import FormLab from "./FormLab";
import FormVisita from "./FormVisita";

const TipoOS = () => {
  const [tipoOS, setTipoOS] = useState(null);

  const changeForm = (e) => {
    setTipoOS(e.target.value);
  };

  return (
    <div className="selecione">
      <p>Selecione o tipo do chamado</p>
      <form>
        <label>
          <input
            type="radio"
            value="0"
            id="tipo_os_lab"
            onChange={changeForm}
            checked={tipoOS === "0"}
          />
          Laboratório
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="1"
            id={"tipo_os_visita"}
            onChange={changeForm}
            checked={tipoOS === "1"}
          />
          Visita
        </label>
        <br />
      </form>
      {tipoOS === "0" && <FormLab />}
      {tipoOS === "1" && <FormVisita />}
    </div>
  );
};

export default TipoOS;
