const http = require('http');
const axios = require('axios');

const server = http.createServer((req, res) => {
  const { method, url, headers } = req;
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const timestamp = new Date().toISOString();

    const log = {
      method,
      url,
      headers,
      body,
      timestamp,
      apiKey: String(process.env.PHOTONS_API_KEY),
      host: String(process.env.PHOTONS_API_URL),
    };

    console.log(JSON.stringify(log, null, 2));

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(`Request logged successfully ${timestamp}\n`);

    try {
      const postData = body;
      const url = String(process.env.PHOTONS_API_URL);
      const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': String(process.env.PHOTONS_API_KEY),
      };

      const response = await axios.post(url, postData, { headers });
      console.log('✅ Response from photons_dev:', response.data);
    } catch (e) {
      console.error(`⛔ Problem with request: ${e.message}`);
    }

    res.end();
  });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP Logger server is running on port ${PORT}`);
});
