const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('🔐 Escanea este QR con tu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot de WhatsApp conectado.');
});

client.on('message', (message) => {
    const texto = message.body.toLowerCase();

    if (texto === 'hola') {
        message.reply('¡Hola! ¿Cómo estás? 😊');
    } else if (texto === 'ayuda') {
        message.reply('Estos son los comandos disponibles:\n- "hola"\n- "ayuda"');
    }
});

module.exports = { client };
