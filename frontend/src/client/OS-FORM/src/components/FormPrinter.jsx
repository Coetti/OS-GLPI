import { useState } from "react";
import axios from "axios";

const FormPrinter = () => {
  const [formData, setFormData] = useState({
    type: "Cartucho",
    model: "",
    brand: "",
    voltage: "110V",
    serial: "",
  });

  const printerTypes = {
    Cartucho: 1,
    "Jato de Tinta": 2,
    Laser: 3,
    Térmica: 4,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/addItem", {
        input: {
          entities_id: "0",
          name: formData.model,
          serial: formData.serial,
          comment: `Tipo: ${formData.type}\r\nVoltagem: ${formData.voltage}`,
          printertypes_id: printerTypes[formData.type],
        },
        node: {
          itemType: "Printer",
        },
      });

      if (response.status === 200) {
        console.log("Dados enviados com sucesso!");
      } else {
        console.error("Falha ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <p>Tipo:</p>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="Cartucho">Cartucho</option>
          <option value="Jato de Tinta">Jato de Tinta</option>
          <option value="Laser">Laser</option>
          <option value="Térmica">Térmica</option>
        </select>
        <p>Modelo:</p>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Modelo"
          required
        />
        <p>Marca:</p>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Marca"
          required
        />
        <p>Voltagem:</p>
        <select
          name="voltage"
          value={formData.voltage}
          onChange={handleChange}
          required
        >
          <option value="110V">110V</option>
          <option value="220V">220V</option>
          <option value="Bivolt">Bivolt</option>
          <option value="Verificar">Verificar</option>
        </select>
        <p>Número de Série:</p>
        <input
          type="text"
          name="serial"
          value={formData.serial}
          onChange={handleChange}
          placeholder="Serial"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default FormPrinter;
