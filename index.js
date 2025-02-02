const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('./router');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: process.env.ORIGIN_CORS }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running in the port ${port}`);
});
