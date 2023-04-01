import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const jwtSecret = process.env.JWT_SECRET as string;

app.use(express.json());

//middleware jwt
function verificaToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    res.status(401).send('Token não fornecido.');
    return;
  }

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
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

  // se precisar do expiresIn em horas usar h, exemplo: 1h
  jwt.sign({ user }, jwtSecret, { expiresIn: '30m' }, (err, token) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erro ao gerar token.');
      return;
    }

    //auth é opcional
    res.json({ auth: true, token });
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('testando rota publica sem a necessidade de token');
});

app.get('/protegido', verificaToken, (req: Request, res: Response) => {
  const user = req.body.user;
  res.send(`Bem-vindo(a), ${user.username} (${user.email})!`);
});

app.listen(3000, () => {
  console.log('O aplicativo está sendo executado na porta 3000!');
});