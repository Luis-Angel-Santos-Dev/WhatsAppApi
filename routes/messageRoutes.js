const express = require('express');
const { sendMessage, sendMessageWithFile } = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/message', authMiddleware, sendMessage);

router.post('/message/file', authMiddleware, sendMessageWithFile);

module.exports = router;
