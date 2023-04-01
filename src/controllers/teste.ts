import { Request, Response } from 'express';

const testes = async (req: Request, res: Response) => {
  try {
    //aqui pode ter uma interação com banco de dados
    res.send('Bem viando ao seu controller teste');
  } catch (err) {
    res.send('Erro controller testes');
  }
};
export default testes;
