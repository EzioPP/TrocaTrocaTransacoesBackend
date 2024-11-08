import { Router, Request, Response } from 'express';
import { logger } from '../../../infra/logger/logger';

const HomeRoutes = Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Retrieve the home page
 *     responses:
 *       200:
 *         description: The home page
 *       500:
 *         description: Internal Server Error
 */
HomeRoutes.get('/', async (req: Request, res: Response) => {
  try {
    res.send('Troca Troca Transações Divitiae et voluptates: duo in uno');
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
    logger.error(error);
  }
});

export default HomeRoutes;
