const path = require('path');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;
const clientDist = path.join(__dirname, '../client/dist');

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// Serve React build in production (Render Web Service)
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
