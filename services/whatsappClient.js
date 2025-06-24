const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
    clientId: "dev" })
});

client.on('qr', (qr) => {
    console.log('🔐 Escanea este QR con tu WhatsApp para el numero de: ' +client.authStrategy.clientId);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot de WhatsApp conectado para: '+client.authStrategy.clientId);
});

client.on('message', (message) => {
    const texto = message.body.toLowerCase();

    if (texto === 'hola') {
        message.reply('¡Hola! ¿Cómo estás? 😊');
    } else if (texto === 'ayuda') {
        message.reply('Estos son los comandos disponibles:\n- "Hola"\n- "Ayuda"');
    }
    
});

module.exports = { client };
