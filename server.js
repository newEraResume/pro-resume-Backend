const express = require('express');
const dotenv = require('dotenv');
const routes = require('./src/routes');
const cors = require('cors');
const db = require('./src/config/config')

dotenv.config();
db.on('error', error => console.error(error));
db.once('open', () => console.log("Connected to DB"));
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
