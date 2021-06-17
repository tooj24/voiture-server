import jwt from 'jsonwebtoken';

export const SECRET_KEY = "key-sectret";

interface jwtDecode {
  pseudo: string;
  userId: string;
}

export const decode = (req: any, res: any, next:any) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY) as jwtDecode;
    req.pseudo = decoded.pseudo
    req.userId = decoded.userId
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
}