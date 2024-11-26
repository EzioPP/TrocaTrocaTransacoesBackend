import { CardControllerFactory } from '@/application/factories/CardControllerFactory';

import { Router, Request, Response } from 'express';
import protect from '../middleware/Protect';
import { can } from '../middleware/Permission';
import { User } from '@/domain/entities';
import { Card } from '@/domain/entities';

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

CardRoutes.post('/',
  async (req: Request, res: Response) => {
    try {
      const newCard = req.body;
      const card = await cardController.save(newCard);
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

CardRoutes.get('/client',
  protect,
  can('user'),
  async (req: Request, res: Response) => {
    try {
      const user: User = req.user as User;
      const cards = await cardController.findByClientId(
        user.clientId,
      );
      res.send(cards);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

CardRoutes.get('/client/:type',
  protect,
  can('user'),
  async (req: Request, res: Response) => {
    try {
      const user: User = req.user as User;
      const cards = await cardController.findByClientIdAndType(
        user.clientId,
        req.params.type,
      );
      res.send(cards);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

CardRoutes.post('/client',
  protect,
  can('user'),
  async (req: Request, res: Response) => {

    const user: User = req.user as User;
    const newCard: Card = req.body;
    newCard.clientId = user.clientId;
    const checkIfExist = await cardController.findByNumber(newCard.cardNumber);
    if (checkIfExist) {
      return res.status(409).send({ error: 'Card already exists' });
    }
    const card = await cardController.save(newCard);
    res.send(card);

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

CardRoutes.delete('/client/:id',
  protect,
  can('user'),
  async (req: Request, res: Response) => {
    try {
      if (!req.user_permission || !req.user) {
        return res.status(403).send({ error: 'Permission denied' });
      }
      const card = await cardController.findById(Number(req.params.id));
      if (!card) {
        return res.status(404).send({ error: 'Card not found' });
      }
      const user = req.user as User;
      if (card.clientId !== user.clientId && req.user_permission < 2) {
        return res.status(403).send({ error: 'Permission denied' });
      }
      await cardController.delete(Number(req.params.id));
      res.send({ message: 'Card deleted successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });


export default CardRoutes;
