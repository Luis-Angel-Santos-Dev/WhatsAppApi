const express = require('express');
const { client } = require('./services/whatsappClient');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', messageRoutes);

client.initialize();

app.listen(PORT, () => {
    console.log(`🚀 API REST escuchando en http://localhost:${PORT}`);
});
