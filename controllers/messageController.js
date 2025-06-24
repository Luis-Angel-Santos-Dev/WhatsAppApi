const { client } = require('../services/whatsappClient');
const { MessageMedia, Buttons } = require('whatsapp-web.js');

const sendMessage = async (req, res) => {
    const { numero, mensaje } = req.body;

    if (!numero || !mensaje) {
        return res.status(400).json({ error: 'Faltan parámetros: numero o mensaje' });
    }

    const numeroConFormato = numero.includes('@c.us') ? numero : `${numero}@c.us`;

    try {
        const response = await client.sendMessage(numeroConFormato, mensaje, { Buttons: [{ buttonId: '1', type: 1, buttonText: 'Hola' }] } );
        res.status(200).json({ success: true, messageId: response.id.id });
    } catch (error) {
        console.error('❌ Error al enviar mensaje:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const sendMessageWithFile = async (req, res) => {
    const { numero, mensaje, file, extFile } = req.body;
    
    if (!numero || !file || !extFile) {
        return res.status(400).json({ error: 'Faltan parámetros: numero o archivo' });
    }

    const media = await new MessageMedia(extFile, file);

    const numeroConFormato = numero.includes('@c.us') ? numero : `${numero}@c.us`;

    try {
        const response = await client.sendMessage(numeroConFormato, media, { caption: mensaje });
        res.status(200).json({ success: true, messageId: response.id.id });
    } catch (error) {
        console.error('❌ Error al enviar mensaje:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { sendMessage, sendMessageWithFile };
