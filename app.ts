import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const jwtSecret = process.env.JWT_SECRET as string;

app.use(express.json());

function verificaToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(401).send('Token não fornecido.');
    return;
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).send('Token inválido.');
      return;
    }

    req.body.user = decoded.user;

    next();
  });
}

app.post('/login', (req: Request, res: Response) => {
  // Aqui você pode fazer a autenticação do usuário
  const user = {
    id: 1,
    username: 'usuario',
    email: 'usuario@exemplo.com',
  };

  jwt.sign({ user }, jwtSecret, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao gerar token.');
      return;
    }

    res.json({ auth: true, token });
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('teste');
});

app.get('/protegido', verificaToken, (req: Request, res: Response) => {
  const user = req.body.user;
  res.send(`Bem-vindo(a), ${user.username} (${user.email})!`);
});

app.listen(3000, () => {
  console.log('O aplicativo está sendo executado na porta 3000!');
});
