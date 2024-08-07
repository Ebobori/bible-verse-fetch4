const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app
const staticPath = path.join(__dirname, '../bible-verse-fetcher/build');
app.use(express.static(staticPath));
console.log(`Serving static files from ${staticPath}`);  // Debugging line

// Endpoint to serve JSON files
app.get('/data/:file', (req, res) => {
  const filePath = path.join(__dirname, '../bible-verse-fetcher/public/data', req.params.file);
  console.log(`Attempting to serve file: ${filePath}`);  // Debugging line
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error sending file: ${filePath}`, err);
      res.status(404).send('File not found');
    }
  });
});

// All other requests return the React app, so it can handle routing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../bible-verse-fetcher/build', 'index.html');
  console.log(`Serving index.html from ${indexPath}`);  // Debugging line
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`Error sending file: ${indexPath}`, err);
      res.status(404).send('File not found');
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 