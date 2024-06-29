import jwt from 'jsonwebtoken'
const SECRET=process.env.JWT_SECRET;
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
export default authenticateToken;  