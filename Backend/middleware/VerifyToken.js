import jwt from 'jsonwebtoken';

export const VerifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.email = decode.email;
    next();
  });
};
