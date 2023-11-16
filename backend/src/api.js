const https = require("https");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const ip = "localhost";
const initSessionPath = "/glpi/apirest.php/initSession";
const initSessionURL = `https://${ip}${initSessionPath}`;
const getEntitiesPath = "/glpi/apirest.php/getMyEntities/?is_recursive=true";
const getEntitiesURL = `https://${ip}${getEntitiesPath}`;

const contentType = "application/json";
const auth = "user_token cKbvdbpK11lFG2Hgj6THf9ohUPP2dFjd1t074XfH";
const appToken = "8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa";
let sessionToken; // Defina sessionToken como uma variável global

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const app = express();

app.use(cors());
app.use(express.json()); // Middleware para analisar o corpo da solicitação como JSON

// Middleware para inicializar a sessão
app.use(async (req, res, next) => {
  const initHeaders = {
    "Content-Type": contentType,
    Authorization: auth,
    "App-Token": appToken,
  };

  const options = {
    method: "GET",
    headers: initHeaders,
    httpsAgent: agent,
  };

  try {
    const response = await axios.request({
      url: initSessionURL,
      ...options,
    });
    const data = response.data;
    sessionToken = data.session_token;
    console.log("this is the sessions token " + sessionToken);
    next(); // Chame next() para continuar com a próxima rota
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// Rota para buscar clientes
app.get("/clientes", async (req, res) => {
  const headers = {
    "Content-Type": contentType,
    "Session-Token": sessionToken,
    "App-Token": appToken,
  };

  console.log(headers); // Certifique-se de que headers contenha o sessionToken

  const options = {
    method: "GET",
    headers: headers,
    httpsAgent: agent,
  };

  try {
    const response = await axios.request({
      url: getEntitiesURL,
      ...options,
    });

    const responseBody = response.data; // Obter apenas o corpo da resposta
    console.log("killing the session...");
    console.log(responseBody);
    res.json(responseBody); // Enviar o corpo da resposta como JSON
  } catch (error) {
    console.log("killing the session...");
    killSession();
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

app.get("/getItems", async (req, res) => {
  const { itemType } = req.query; // Obtém o valor do parâmetro 'itemType' da URL

  const getItemsPath = `/glpi/apirest.php/${itemType}`;
  const getItemsURL = `https://${ip}${getItemsPath}`;

  const headers = {
    "Content-Type": contentType,
    "Session-Token": sessionToken,
    "App-Token": appToken,
  };

  const options = {
    method: "GET",
    headers: headers,
    httpsAgent: agent,
  };

  try {
    const response = await axios.request({
      url: getItemsURL,
      ...options,
    });

    const responseBody = response.data; // Obter apenas o corpo da resposta
    console.log("killing the session...");
    //killSession();
    res.json(responseBody); // Enviar o corpo da resposta como JSON
  } catch (error) {
    console.log("killing the session...");
    killSession();
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

app.get("/getTickets", async (req, res) => {
  const ticketsPath = "/glpi/apirest.php/Ticket";
  const ticketsUrl = `https://${ip}${ticketsPath}`;

  const headers = {
    "Content-Type": contentType,
    "Session-Token": sessionToken,
    "App-Token": appToken,
  };

  const options = {
    method: "GET",
    headers: headers,
    httpsAgent: agent,
  };

  try {
    const response = await axios.request({
      url: ticketsUrl,
      ...options,
    });
    console.log(response.data);
    console.log("killing the session...");
    killSession();
    res.send(response.data);
  } catch (error) {
    console.log("killing the session...");
    killSession();
    res.status(500).send(error.message);
  }
});

function killSession() {
  const killSessionPath = "/glpi/apirest.php/killSession";
  const killSessionUrl = `https://${ip}${killSessionPath}`;

  const headers = {
    "Content-Type": contentType,
    "Session-Token": sessionToken,
    "App-Token": appToken,
  };

  const options = {
    method: "GET",
    headers: headers,
    httpsAgent: agent,
  };

  try {
    const killed = axios.request({
      url: killSessionUrl,
      ...options,
    });
    return console.log(`Session Killed! ${sessionToken}`);
  } catch (error) {
    console.log("Unexpected error!");
  }
}

app.post("/addCliente", async (req, res) => {
  const dadosJSON = req.body;
  console.log(dadosJSON);
  const addEntityPath = "/glpi/apirest.php/Entity";
  const addEntityUrl = `https://${ip}${addEntityPath}`;

  const headers = {
    "Content-Type": contentType,
    "Session-Token": sessionToken,
    "App-Token": appToken,
  };

  const options = {
    method: "POST",
    headers: headers,
    httpsAgent: agent,
  };

  try {
    const response = await axios.post(addEntityUrl, dadosJSON, options);
    const responseBody = response.data;
    console.log("killing the session...");
    killSession();
    res.json(responseBody);
  } catch (error) {
    console.log("killing the session...");
    killSession();
    res.status(500).send(error.message);
  }
});

app.post("/addItem", async (req, res) => {
  const dadosJSON = req.body;
  const itemType = dadosJSON.node.itemType;
  console.log(dadosJSON + dadosJSON.node.itemType);
  const addItemPath = `/glpi/apirest.php/${itemType}`;
  const addItemUrl = `https://${ip}${addItemPath}`;

  const headers = {
    "Content-Type": contentType,
    "Session-Token": sessionToken,
    "App-Token": appToken,
  };

  const options = {
    method: "POST",
    headers: headers,
    httpsAgent: agent,
  };
  console.log(dadosJSON.input);

  try {
    const response = await axios.post(addItemUrl, dadosJSON, options);
    const responseBody = response.data;
    console.log("killing the session...");
    killSession();
    res.json(responseBody);
  } catch (error) {
    console.log("killing the session...");
    killSession();
    res.status(500).send(error.message);
  }
});

app.post("/createTicket", async (req, res) => {
  const dadosJSON = req.body;

  const createTicketPath = `/glpi/apirest.php/Ticket`;
  const createTicketUrl = `https://${ip}${createTicketPath}`;

  const headers = {
    "Content-Type": contentType,
    "Session-Token": sessionToken,
    "App-Token": appToken,
  };

  const options = {
    method: "POST",
    headers: headers,
    httpsAgent: agent,
  };

  try {
    const response = await axios.post(createTicketUrl, dadosJSON, options);
    const responseBody = response.data;
    console.log("killing the session...");
    killSession();
    res.json(responseBody);
  } catch (error) {
    console.log("killing the session...");
    killSession();
    res.status(500).send(error.message);
  }
});

app.post("/changeEntity", async (req, res) => {
  const dadosJSON = req.body;

  const changeEntityPath = `/glpi/apirest.php/changeActiveEntities/`;
  const changeEntityUrl = `https://${ip}${changeEntityPath}`;

  const headers = {
    "Content-Type": contentType,
    "Session-Token": sessionToken,
    "App-Token": appToken,
  };

  const options = {
    method: "POST",
    headers: headers,
    httpsAgent: agent,
  };

  try {
    const response = await axios.post(changeEntityUrl, dadosJSON, options);
    const responseBody = response.data;
    console.log("killing the session...");
    killSession();
    res.json(responseBody);
  } catch (error) {
    console.log("killing the session...");
    killSession();
    res.status(500).send(responseBody);
  }
});

// Inicie o servidor Express
app.listen(8081, function () {
  console.log("Node API conectada com sucesso!!");
});
