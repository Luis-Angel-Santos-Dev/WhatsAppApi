const { client } = require('../services/whatsappClient');
const { MessageMedia } = require('whatsapp-web.js');

const sendMessage = async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ message: 'El número de destino y el mensaje a enviar son datos obligatorios.' });
    }

    const numeroConFormato = phone.includes('@c.us') ? `521${phone}` : `521${phone}@c.us`;

    try {
        const response = await client.sendMessage(numeroConFormato, message);
        res.status(200).json({ success: true, messageId: response.id.id });
    } catch (error) {
        console.error('❌ Error al enviar mensaje:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const sendMessageWithFile = async (req, res) => {
    const { phone, message, file, extFile, fileName } = req.body;
    
    if (!phone || !file || !extFile) {
        return res.status(400).json({ message: 'El número de destino, la extensión, nombre del archivo y el archivo son datos obligatorios.' });
    }

    const media = await new MessageMedia(extFile, file, fileName);

    const numeroConFormato = phone.includes('@c.us') ? `521${phone}` : `521${phone}@c.us`;

    try {
        const response = await client.sendMessage(numeroConFormato, media, { caption: message });
        res.status(200).json({ success: true, message: response.id.id });
    } catch (error) {
        console.error('❌ Error al enviar mensaje:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { sendMessage, sendMessageWithFile };
