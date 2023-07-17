const http = require('http');
const url = require('url');
const axios = require('axios');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const emailId = parsedUrl.query.email_id;

  if (parsedUrl.pathname === '/track') {
    // Record the email open event in your server-side code or database
    // You can implement your logic to store the event data

    // Forward data to Google Analytics using the Measurement Protocol
    const trackingId = 'G-9532TRR4MZ'; // Replace with your Google Analytics tracking ID
    const apiUrl = 'https://www.google-analytics.com/collect';
    const websiteUrl = 'https://texnikoi.osu.edu'; // Replace with your website URL

    const postData = {
      v: '1', // Protocol version
      tid: trackingId, // Tracking ID
      t: 'event', // Event hit type
      ec: 'Email', // Event category
      ea: 'Open', // Event action
      el: emailId, // Event label
      dl: websiteUrl // Document location URL
    };

    axios
      .post(apiUrl, postData)
      .then(() => {
        res.statusCode = 200;
        res.end();
      })
      .catch((error) => {
        console.error('Error forwarding data to Google Analytics:', error);
        res.statusCode = 500;
        res.end();
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

const port = 3000; // Replace with your desired port number
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});