import React, { useState, useEffect } from 'react';
import './App.css';
import ComputerList from './ComputerList';
import axios from 'axios';

function App() {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost/glpi/apirest.php/Computers') // Change the URL to your backend endpoint
      .then(response => {
        setComputers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <ComputerList computers={computers} />
    </div>
  );
}

export default App;
