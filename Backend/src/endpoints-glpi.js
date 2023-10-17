const https = require('https');

var ip = "localhost";
var initSessionURL = "https://" + ip + "/glpi/apirest.php/initSession";
var killSessionURL = "https://" + ip + "/glpi/apirest.php/killSession";
var getEntitiesURL = "https://"+ ip +"/glpi/apirest.php/getMyEntities/?is_recursive=true";

// Headers for init session 
const initHeaders = {
  'Content-Type': 'application/json',
  'Authorization': 'user_token cKbvdbpK11lFG2Hgj6THf9ohUPP2dFjd1t074XfH',
  'App-Token': '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
};



// Define headers (if any)
const headers = {
    'Content-Type': 'application/json', // Example header, adjust as needed
    'Session-Token': 'fauhhs5u9uuuhal6ppgla0sq22', // Example authorization header, adjust as needed
    'App-Token': '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
  };
  
  function initSession(url, method, headers) {
    const options = {
      method: method,
      headers: headers,
      rejectUnauthorized: false
    };
  
    const req = https.request(url, options, (res) => {
      let data = '';
  
      // A chunk of data has been received.
      res.on('data', (chunk) => {
        data += chunk;
      });
  
      // The whole response has been received.
      res.on('end', () => {
        const response = JSON.parse(data)
        const sessionToken = response.session_token;
        console.log(sessionToken);
      });
    });
  
    // Handle errors
    req.on('error', (e) => {
      console.error(`Error: ${e.message}`);
    });

    // End the request
    req.end(); 
  }

  function killSession(url, method, headers) {
    const options = {
      method: method,
      headers: headers,
      rejectUnauthorized: false
    };
  
    const req = https.request(url, options, (res) => {
      let data = '';
  
      // A chunk of data has been received.
      res.on('data', (chunk) => {
        data += chunk;
      });
  
      // The whole response has been received.
      res.on('end', () => {
        console.log("Session killed succefully");
      });

    });
  
    // Handle errors
    req.on('error', (e) => {
      console.error(`Error: ${e.message}`);
    });

    //end the request
    req.end();
  }
  
  //initSession
  initSession(initSessionURL, 'GET', initHeaders);

  //Kill the Session
  killSession(killSessionURL, 'GET', headers);

  // Example usage
  //makeRequest(getEntities, 'GET', headers);