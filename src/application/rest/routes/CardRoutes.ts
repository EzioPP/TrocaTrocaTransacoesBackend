import { CardControllerFactory } from '@/application/factories/CardControllerFactory';

import { Router, Request, Response } from 'express';

const CardRoutes = Router();
const cardController = CardControllerFactory();

CardRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const cards = await cardController.findAll();
    res.send(cards);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

CardRoutes.get('/id/:id', async (req: Request, res: Response) => {
  try {
    const card = await cardController.findById(Number(req.params.id));
    if (!card) {
      res.status(404).send({ error: 'Card not found' });
    }
    res.send(card);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

CardRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const card = await cardController.save(req.body);
    res.send(card);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

CardRoutes.put('/id/:id', async (req: Request, res: Response) => {
  try {
    const card = await cardController.update(req.body);
    if (!card) {
      res.status(404).send({ error: 'Card not found' });
    }
    res.send(card);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

CardRoutes.get('/number/:number', async (req: Request, res: Response) => {
  try {
    const card = await cardController.findByNumber(req.params.number);
    if (!card) {
      res.status(404).send({ error: 'Card not found' });
    }
    res.send(card);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

CardRoutes.delete('/id/:id', async (req: Request, res: Response) => {
  try {
    const card = await cardController.delete(Number(req.params.id));
    if (!card) {
      res.status(404).send({ error: 'Card not found' });
    }
    res.send(card);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default CardRoutes;
