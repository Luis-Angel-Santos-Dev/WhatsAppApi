const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
    clientId: "dev" })
});

// Objeto para almacenar el estado de cada usuario
let userStates = {};


client.on('qr', (qr) => {
    console.log('🔐 Escanea este QR con tu WhatsApp para el numero de: ' +client.authStrategy.clientId);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot de WhatsApp conectado para: '+client.authStrategy.clientId);
});

client.on('message', (message) => {
    const texto = message.body.toLowerCase().trim();
    const senderId = message.from;
    const userName = message.rawData?.notifyName || 'usuario';

    // Inicializar estado del usuario si no existe
    if (!userStates[senderId]) {
        userStates[senderId] = 'inicio';
    }

    // Respuesta al saludo inicial
    if (texto === 'hola' && userStates[senderId] === 'inicio') {
        const totalDistritos = 22;

        // Generar lista numerada de distritos
        const menuDistritos = Array.from({ length: totalDistritos }, (_, i) => {
            return `*${i + 1}*. Distrito ${i + 1}`;
        }).join('\n');

        const mensajeBienvenida = 
            `¡Hola *${userName}*! 👋 Bienvenido al sistema de atención virtual. Por favor, indícanos de qué distrito eres contestando con un número del siguiente menú:\n\n${menuDistritos}`;

        message.reply(mensajeBienvenida)
        userStates[senderId] = 'menu_distritos';
    }

});


module.exports = { client };
