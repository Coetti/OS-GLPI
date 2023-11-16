/* eslint-disable react/prop-types */
import React from "react";

class List extends React.Component {
  render() {
    const items = this.props.items;

    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
}

export default List;
