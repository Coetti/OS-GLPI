import React, { Component } from 'react';
import styles from './SelectCliente.module.css'

class SelectCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedItemId: null,
    };
  }

  componentDidMount() {
    // Fazer uma chamada à sua API e mapear os dados do campo 'name'.
    fetch('http://localhost:8081/clientes')
      .then(response => response.json())
      .then(data => {
        // Acesse a propriedade "myentities" na resposta da API
        const entities = data.myentities;

        // Mapeie os itens a partir de "entities" e limpe o nome
        const items = entities.map(entity => ({
          id: entity.id,
          name: entity.name.includes("&#62;") ? entity.name.split("&#62;")[1].trim() : entity.name
        }));

        this.setState({ items });
      })
      .catch(error => {
        console.error('Erro na chamada à API:', error);
      });
  }

  handleItemClick = (itemId) => {
    this.setState({ selectedItemId: itemId });
  };

  render() {
    const { items } = this.state;
    const { selectedItemId } = this.state;

    return (
      <div>
        <select className={styles.select}>
          {items.map((item) => (
            <option
              key={item.id}
              value={item.id}
              onClick={() => this.handleItemClick(item.id)}
            >
              {item.name}
            </option>
          ))}
        </select>

        {selectedItemId && (
          <div>
            <p>Item Selecionado: {items.find((item) => item.id === selectedItemId).name}</p>
          </div>
        )}
      </div>
    );
  }
}

export default SelectCliente;
