const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the project root so images, scripts, and pages are available.
app.use(express.static(path.join(__dirname)));

// Root route serves the main index page.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Coming soon preview route.
app.get('/comingsoon', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'comingsoon.html'));
});

// Optional fallback for unknown routes.
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => {
  console.log(`Preview server running: http://localhost:${port}`);
});