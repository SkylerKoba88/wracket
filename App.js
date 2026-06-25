const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the project root so images, scripts, and fonts are available.
app.use(express.static(path.join(__dirname), { index: false }));

// Default route and unknown routes should show the coming soon page.
app.get(['/', '/index.html', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'comingsoon.html'));
});

// Coming soon preview route.
app.get('/comingsoon', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'comingsoon.html'));
});

// Catch-all route sends the coming soon page for any other path.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'comingsoon.html'));
});

app.listen(port, () => {
  console.log(`Preview server running: http://localhost:${port}`);
});