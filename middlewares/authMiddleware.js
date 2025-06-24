function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No tienes autorización para realizar esta acción' });
    }

    const token = authHeader; 

    if (token !== 'tu_token_secreto') {
        return res.status(403).json({ message: 'No tienes autorización para realizar esta acción' });
    }

    next(); 
}

module.exports = authMiddleware;
