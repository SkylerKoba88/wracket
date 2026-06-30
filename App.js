import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname), { index: false }));

// Default route and unknown routes should show the coming soon page.
app.get(['/', '/index.html', '/home'], (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'comingsoon.html'));
});

// Coming soon preview route.
app.get('/comingsoon', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'comingsoon.html'));
});

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'shop.html'));
});

/* Catch-all route sends the coming soon page for any other path.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'comingsoon.html'));
});*/

app.listen(port, () => {
  console.log(`Preview server running: http://localhost:${port}`);
});