const express = require('express');
const { client } = require('./services/whatsappClient');
const messageRoutes = require('./routes/messageRoutes');
var bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json());
app.use('/api', messageRoutes);

client.initialize();

app.listen(PORT, () => {
    console.log(`🚀 API REST escuchando en http://localhost:${PORT}`);
});
