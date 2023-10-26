const https = require('https');

const ip = "localhost";
const baseURL = `https://${ip}/glpi/apirest.php/`;
let itemsType = "Computer";

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'user_token cKbvdbpK11lFG2Hgj6THf9ohUPP2dFjd1t074XfH',
    'App-Token': '8r40UKACsvbA2dtGkEcz4s3ePkkHGs0ayfFSvbJa'
};

async function makeRequest(url, method, customHeaders = {}) {
    return new Promise((resolve, reject) => {
        const selectedHeaders = Object.keys(customHeaders).length > 0 ? customHeaders : headers;

        const options = {
            method,
            headers: selectedHeaders,
            rejectUnauthorized: false
        };

        const req = https.request(url, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (e) => {
            reject(`Error: ${e.message}`);
        });

        req.end();
    });
}

// The rest of your code...


async function initSession() {
    const url = `${baseURL}initSession`;
    const method = 'GET';
    const response = await makeRequest(url, method, headers);
    console.log(response); // Log the response
    const parsedResponse = JSON.parse(response);
    return parsedResponse.session_token;
}


async function killSession() {
    const url = `${baseURL}killSession`;
    const method = 'GET';
    await makeRequest(url, method);
    console.log("Session killed successfully");
}

async function getEntities(headersWithSession) {
    const url = `${baseURL}getMyEntities/?is_recursive=true`;
    const method = 'GET';
    const response = await makeRequest(url, method, headersWithSession);
    console.log(JSON.parse(response));
}

async function getItems(headersWithSession) {
    const url = `${baseURL}${itemsType}`;
    const method = 'GET';
    const response = await makeRequest(url, method, headersWithSession);

    try {
        const parsedData = JSON.parse(response);
        const mappedData = parsedData.map(item => {
            const { name, serial, comment } = item;
            let voltagem = null;
            let senha = null;

            // Check if 'comment' exists and is not empty
            if (comment && comment.trim() !== '') {
                const commentParts = comment.split('\n');

                commentParts.forEach(part => {
                    if (part.includes('Voltagem')) {
                        voltagem = part.split('Voltagem')[1].trim();
                    } else if (part.includes('Senha:')) {
                        senha = part.split('Senha:')[1].trim();
                    }
                });
            }

            return {
                name,
                serial,
                voltagem,
                senha
            };
        });

        console.log(mappedData);
    } catch (error) {
        console.error(`Error parsing JSON: ${error.message}`);
    }
}




async function main() {
    try {
        const sessionToken = await initSession();

        const headersWithSession = {
            ...headers,
            'Session-Token': sessionToken
        };

        await getEntities(headersWithSession);
        await getItems(headersWithSession);

        // Kill the session (if needed)
        // await killSession();
    } catch (error) {
        console.error(error);
    }
}

main();
