import React, { useEffect, useState } from 'react';
import { initSession, getItems, headers, headersWithSession } from './api'; // Make sure to adjust the path

const ComputerList = () => {
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize session and get session token
        const sessionToken = await initSession();

        const headersWithSession = {
          ...headers,
          'Session-Token': sessionToken
        };

        // Fetch items with headers containing session token
        const items = await getItems(headersWithSession);
        setComputers(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div>
      <h2>Computer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Serial Number</th>
            <th>Voltagem</th>
            <th>Senha</th>
          </tr>
        </thead>
        <tbody>
          {computers.map((computer, index) => (
            <tr key={index}>
              <td>{computer.name}</td>
              <td>{computer.serial}</td>
              <td>{computer.voltagem}</td>
              <td>{computer.senha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComputerList;
