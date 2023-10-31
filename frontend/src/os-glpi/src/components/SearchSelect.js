import React, { Component } from 'react';

class SearchSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      results: [],
      selectedResult: null,
    };
  }

  handleSearchChange = (e) => {
    const query = e.target.value;
    this.setState({ searchQuery: query });

    // Faça uma chamada à sua API aqui para buscar os resultados com base na query.
    // Por simplicidade, usaremos um array vazio aqui.
    const results = [];

    this.setState({ results });
  };

  handleResultClick = (result) => {
    this.setState({ selectedResult: result });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={this.state.searchQuery}
          onChange={this.handleSearchChange}
        />

        <div>
          {this.state.results.map((result) => (
            <div
              key={result.id}
              onClick={() => this.handleResultClick(result)}
            >
              {result.name}
            </div>
          ))}
        </div>

        {this.state.selectedResult && (
          <div>
            <p>Item Selecionado: {this.state.selectedResult.name}</p>
          </div>
        )}
      </div>
    );
  }
}

export default SearchSelect;
