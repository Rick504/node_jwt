import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middlewares/verifyToken';

const appRouter = express.Router();

// GET ----------------------------------------------------------------------
appRouter.get('/', (req: Request, res: Response) => {
  res.send('testando rota publica sem a necessidade de token');
});

appRouter.get('/protegido', verifyToken, (req: Request, res: Response) => {
  const user = req.body.user;
  res.send(`Bem-vindo(a), ${user.username} (${user.email})!`);
});

//POST ----------------------------------------------------------------------
appRouter.post('/login', (req: Request, res: Response) => {
  const user = {
    id: 1,
    username: 'usuario',
    email: 'usuario@exemplo.com',
  };

  const jwtSecret = process.env.JWT_SECRET as string;
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

export default appRouter;
