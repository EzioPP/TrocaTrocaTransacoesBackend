import { Router, Request, Response } from 'express';
import { logger } from '../../../infra/logger/logger';

const HomeRoutes = Router();


HomeRoutes.get('/', async (req: Request, res: Response) => {
  try {
    res.send('Troca Troca Transações Divitiae et voluptates: duo in uno');
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
    logger.error(error);
  }
});

export default HomeRoutes;
