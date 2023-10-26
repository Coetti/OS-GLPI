const https = require('https');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors');


const ip = "localhost";
const initSessionPath = "/glpi/apirest.php/initSession";
const initSessionURL = `https://${ip}${initSessionPath}`;
const getEntitiesPath = "/glpi/apirest.php/getMyEntities/?is_recursive=true";
const getEntitiesURL = `https://${ip}${getEntitiesPath}`;

const contentType = 'application/json';
const auth = 'user_token cKbvdbpK11lFG2Hgj6THf9ohUPP2dFjd1t074XfH'
const appToken = '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
var sessionToken = null;


const agent = new https.Agent({
  rejectUnauthorized: false
});

const app = express();

app.use(cors());

app.get('/initSession', async (req, res) => {

  const initHeaders = {
    'Content-Type': contentType,
    'Authorization': auth,
    'App-Token': '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
  };

  
  const options = {
    method: 'GET',
    headers: initHeaders,
    httpsAgent: agent
  };

  try {
    const response = await axios.request({
      url: initSessionURL,
      ...options
    });
    const data = response.data;
    sessionToken = data.session_token;
    console.log('this is the sessions token ' + sessionToken)
    res.send(response.data); //remover
  } catch (error) {
    res.status(500).send(error.message);
  }
});

var headers = {
  'Content-Type': 'application/json',
  'Session-Token': sessionToken,
  'App-Token': '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
};

app.get("/clientes", async (req,res) =>{

console.log(headers)

const options = {
    method: 'GET',
    headers: headers,
    httpsAgent: agent
};

  try{
    const response = await axios.request({
      url: getEntitiesURL,
      ...options
    });

    const clientes = response.data.myentities;

    // Extrair as substrings após "&#62;" das strings de "name"
    const extractedNames = clientes.map((cliente) => {
      const parts = cliente.name.split('&#62;');
      if (parts.length > 1) {
        return parts[1].trim(); // Obtenha a segunda parte e remova espaços em branco extras
      } else {
        return cliente.name; // Se não houver "&#62;", mantenha o nome original
      }
    });

    console.log(extractedNames);
    res.send(extractedNames);

  }catch(error){
    res.status(500).send(error.message);
  }

});

app.listen(8081, function(){
  console.log("Node API conectada com sucesso!!")
});
