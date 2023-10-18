import { endpoint } from "./endpoints-glpi.js";
import https from 'https';


var sessionToken;

var itemsType = "Computer";

// Headers for init session 
const initHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'user_token cKbvdbpK11lFG2Hgj6THf9ohUPP2dFjd1t074XfH',
    'App-Token': '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
  };
  
  function initSession(url, method, headers) {
    return new Promise((resolve, reject) => {
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
                const response = JSON.parse(data);
                sessionToken = response.session_token;
                console.log(sessionToken);
                resolve(sessionToken);
            });
        });
  
        // Handle errors
        req.on('error', (e) => {
            reject(`Error: ${e.message}`);
        });
  
        // End the request
        req.end();
    });
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
  
    function getEntities(url, method, headers) {
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
          console.log(JSON.parse(data));
        });
      });
    
      // Handle errors
      req.on('error', (e) => {
        console.error(`Error: ${e.message}`);
      });
  
      // End the request
      req.end(); 
    }
  
    function getItems(url, method, headers) {
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
          console.log(JSON.parse(data));
        });
      });
    
      // Handle errors
      req.on('error', (e) => {
        console.error(`Error: ${e.message}`);
      });
  
      // End the request
      req.end(); 
    }
  
  
    async function main() {
    try {
      // Initialize session
      sessionToken = await initSession(endpoint.initSession, 'GET', initHeaders);
  
      // Define headers with session token
      const headers = {
        'Content-Type': 'application/json',
        'Session-Token': sessionToken,
        'App-Token': '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
      };
  
      // GET all items
      await getEntities(endpoint.getEntitiesURL, 'GET', headers);
      await getItems(endpoint.getItemsURL, 'GET', headers);
      //await killSession(killSessionURL, 'GET', headers);
      // Kill the session (if needed)
      // await killSession(killSessionURL, 'GET', headers);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the main function
  main();