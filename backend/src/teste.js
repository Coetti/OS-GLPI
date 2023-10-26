const https = require('https');
//const express = require('express');
//const axios = require('axios');
const fs = require('fs');

const ip = "localhost";
const initSessionPath = "/glpi/apirest.php/initSession";
const initSessionURL = `https://${ip}${initSessionPath}`;

//const app = express();

const privateKey = fs.readFileSync('certificate.key', 'utf-8');
const certificate = fs.readFileSync('certificate.crt', 'utf-8');
const credentials = {
  key: privateKey,
  cert: certificate
}

const httpsServer = https.createServer(credentials, app);

app.get('/teste', async (req, res) => {

  const initHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'user_token cKbvdbpK11lFG2Hgj6THf9ohUPP2dFjd1t074XfH',
    'App-Token': '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
  };

  const options = {
    method: 'GET',
    headers: initHeaders,
    rejectUnauthorized: false
  };

  try {
    const response = await https.request({
      url: initSessionURL,
      ...options
    });

    res.send(response.data + "deu erro");
  } catch (error) {
    res.status(500).send(error.message + "deu erro");
  }
});

httpsServer.listen(8081, function(){
  console.log("node api conectada")
});
