const https = require('https');

var itemsType = "Computer";
var ip = "localhost";
var initSessionURL = "https://" + ip + "/glpi/apirest.php/initSession";
var killSessionURL = "https://" + ip + "/glpi/apirest.php/killSession";
var getEntitiesURL = "https://"+ ip +"/glpi/apirest.php/getMyEntities/?is_recursive=true";
var getItemsURL = "https://"+ ip +"/glpi/apirest.php/" + itemsType;

var sessionToken;



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
            try {
              const parsedData = JSON.parse(data);
              const mappedData = parsedData.map(item => {
                // Verificando se o campo 'comment' não é nulo ou vazio
                if (item.comment && item.comment.trim() !== '') {
                  const commentParts = item.comment.split('\n');
                  const voltagem = commentParts.find(part => part.includes('Voltagem:'));
                  const senha = commentParts.find(part => part.includes('Senha:'));
              
                  return {
                    id: item.id,
                    name: item.name,
                    serial: item.serial,
                    voltagem: voltagem ? voltagem.split(': ')[1] : null,
                    senha: senha ? senha.split(': ')[1] : null,
                    date_mod: item.date_mod
                  };
                } else {
                  return {
                    id: item.id,
                    name: item.name,
                    serial: item.serial,
                    voltagem: null,
                    senha: null,
                    date_mod: item.date_mod
                  };
                }
              });              
              console.log(mappedData);
            } catch (error) {
              console.error(`Error parsing JSON: ${error.message}`);
            }
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
      sessionToken = await initSession(initSessionURL, 'GET', initHeaders);
  
      // Define headers with session token
      const headers = {
        'Content-Type': 'application/json',
        'Session-Token': sessionToken,
        'App-Token': '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
      };
  
      // GET all items
      await getEntities(getEntitiesURL, 'GET', headers);
      await getItems(getItemsURL, 'GET', headers);
      //await killSession(killSessionURL, 'GET', headers);
      // Kill the session (if needed)
      // await killSession(killSessionURL, 'GET', headers);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the main function
  main();