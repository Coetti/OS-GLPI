import { useState } from "react";
import axios from "axios";

const FormCliente = () => {
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    address: "",
    city: "",
    cep: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/addCliente", {
        input: {
          entities_id: "0",
          name: formData.name,
          address: formData.address,
          town: formData.city,
          postcode: formData.cep,
          comment: `Phone: ${formData.phone} \nDocument: ${formData.document}`,
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
        <p>Nome:</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome ou Razão"
          required
        />
        <p>Documento:</p>
        <input
          type="text"
          name="document"
          value={formData.document}
          onChange={handleChange}
          placeholder="CPF ou CNPJ"
          required
        />
        <p>Endereço:</p>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Endereço"
          required
        />
        <p>Cidade:</p>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Cidade"
          required
        />
        <p>CEP:</p>
        <input
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          placeholder="CEP"
          required
        />
        <p>Telefone:</p>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefone"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default FormCliente;
