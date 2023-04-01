import express from 'express';
import dotenv from 'dotenv';
import appRouter from './routers/index';

dotenv.config();
const app = express();

app.use(express.json());
app.use(appRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `O aplicativo está sendo executado na porta ${process.env.PORT} !`
  );
});
