import { useState, useEffect } from "react";
import axios from "axios";

function DataFetcher({ children }) {
  const [clientesNome, setClientesNome] = useState([]);
  const [itemComputer, setItemComputer] = useState([]);
  const [itemPrinter, setItemPrinter] = useState([]);
  const [itemPeripheral, setItemPeripheral] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataClientes = async () => {
      try {
        const endpoint = "http://localhost:8081/clientes";
        const response = await axios.get(endpoint);

        if (Array.isArray(response.data.myentities)) {
          const nomesDirt = response.data.myentities.map(
            (cliente) => cliente.name
          );
          const nomes = nomesDirt.map((str) =>
            str.replace("Root entity &#62; ", "")
          );
          setClientesNome(nomes);
        } else {
          console.log("myentities não é um array válido");
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        // Tratar o erro, se necessário
      }
    };

    fetchDataClientes();
  }, []);

  useEffect(() => {
    const fetchDataComputer = async () => {
      try {
        const endpoint = "http://localhost:8081/getItems?itemType=Computer";
        const response = await axios.get(endpoint);

        if (Array.isArray(response.data)) {
          const computersSerial = response.data.map(
            (computer) => computer.serial
          );
          setItemComputer(computersSerial);
        } else {
          console.log("A resposta não é um array válido ou não contém dados");
        }
      } catch (error) {
        console.error("Erro ao buscar itens do tipo Computer:", error);
        // Trate o erro adequadamente
      }
    };

    fetchDataComputer();
  }, []);

  useEffect(() => {
    const fetchDataPrinter = async () => {
      try {
        const endpoint = "http://localhost:8081/getItems?itemType=Printer";
        const response = await axios.get(endpoint);

        if (Array.isArray(response.data)) {
          const printersSerial = response.data.map((printer) => printer.serial);
          setItemPrinter(printersSerial);
        } else {
          console.log("A resposta não é um array válido ou não contém dados");
        }
      } catch (error) {
        console.error("Erro ao buscar itens do tipo Printer:", error);
        // Trate o erro adequadamente
      }
    };

    fetchDataPrinter();
  }, []);

  useEffect(() => {
    const fetchDataPeripheral = async () => {
      try {
        const endpoint = "http://localhost:8081/getItems?itemType=Peripheral";
        const response = await axios.get(endpoint);

        if (Array.isArray(response.data)) {
          const peripheralsSerial = response.data.map(
            (peripheral) => peripheral.serial
          );
          setItemPeripheral(peripheralsSerial);
        } else {
          console.log("A resposta não é um array válido ou não contém dados");
        }
      } catch (error) {
        console.error("Erro ao buscar itens do tipo Peripheral:", error);
        // Trate o erro adequadamente
      } finally {
        // Set loading as false only after all the data fetching is done
        setLoading(false);
      }
    };

    fetchDataPeripheral();
  }, []);

  useEffect(() => {
    // Merge the arrays only after the data from all requests is set
    if (
      itemComputer.length > 0 &&
      itemPrinter.length > 0 &&
      itemPeripheral.length > 0
    ) {
      const all = itemComputer.concat(itemPeripheral, itemPrinter);
      setAllItems(all);
    }
  }, [itemComputer, itemPrinter, itemPeripheral]);

  // Return the child component (SearchClientes in this case) with the necessary data and methods
  return children({ clientesNome, allItems, loading });
}

export default DataFetcher;
