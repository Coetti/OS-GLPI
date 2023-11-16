import { useState } from "react";
import axios from "axios";

const FormItemDiverso = () => {
  const [formData, setFormData] = useState({
    description: "",
    model: "",
    brand: "",
    voltage: "110V",
    password: "",
    serial: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/addItem", {
        input: {
          entities_id: "0",
          name: formData.description,
          serial: formData.serial,
          comment: `Modelo: ${formData.model}\r\nMarca: ${formData.brand}\r\nVoltagem: ${formData.voltage}\r\nSenha: ${formData.password}`,
        },
        node: {
          itemType: "Peripheral",
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
        <p>Descrição:</p>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
          required
        />
        <p>Modelo:</p>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Modelo"
        />
        <p>Marca:</p>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Marca"
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

export default FormItemDiverso;
