const express = require('express');
const cors = require('cors');

const listRoutes = require('./server/routes/c2.list.routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/products', listRoutes);

app.listen(PORT, () => {
  console.log(`CeylonCart server running on http://localhost:${PORT}`);
});
