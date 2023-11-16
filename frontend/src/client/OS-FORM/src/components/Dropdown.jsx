import React, { Component } from "react";
import styles from "./Dropdown.module.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      isDropdownOpen: false,
    };
  }

  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  handleMouseEnter = () => {
    this.setState({ isDropdownOpen: true });
  };

  handleMouseLeave = () => {
    this.setState({ isDropdownOpen: false });
  };

  render() {
    const options = ["Opção 1", "Opção 2", "Opção 3"];

    return (
      <div
        className={styles.dropdown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles.dropdownbutton}>Selecione uma opção</div>
        {this.state.isDropdownOpen && (
          <div className={styles.dropdown_content}>
            <select
              value={this.state.selectedOption}
              onChange={this.handleOptionChange}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
