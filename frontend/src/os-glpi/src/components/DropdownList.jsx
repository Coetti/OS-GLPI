import React, { useState } from 'react';

const DropdownList = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="selected-option" onClick={toggleDropdown}>
        {selectedOption.label}
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={option.id === selectedOption.id ? 'selected' : ''}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownList;