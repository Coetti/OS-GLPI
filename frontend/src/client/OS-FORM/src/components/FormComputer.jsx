import { useState } from "react";
import axios from "axios";

const FormComputer = () => {
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    voltage: "110V",
    password: "",
    serial: "",
    itemType: "Computer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/addItem", {
        input: {
          entities_id: "0",
          name: formData.model,
          serial: formData.serial,
          comment: `Voltagem ${formData.voltage}\r\nSenha: ${formData.password}`,
        },
        node: {
          itemType: formData.itemType,
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
          name="itemType"
          value={formData.itemType}
          onChange={handleChange}
        >
          <option value="Computer">Desktop</option>
          <option value="Laptop">Notebook</option>
          <option value="Netbook">Netbook</option>
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
        <p>Senha:</p>
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Senha"
          required
        />
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

export default FormComputer;
