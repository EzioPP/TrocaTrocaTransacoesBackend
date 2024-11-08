import { CardControllerFactory } from '@/application/factories/CardControllerFactory';

import { Router, Request, Response } from 'express';

const CardRoutes = Router();
const cardController = CardControllerFactory();

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Retrieve all cards
 *     responses:
 *       200:
 *         description: A list of cards
 *       500:
 *         description: Internal Server Error
 * /api/cards/id/{id}:
 *   get:
 *     summary: Retrieve a card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A card object
 *       404:
 *         description: Card not found
 *       500:
 *         description: Internal Server Error
 * /api/cards:
 *   post:
 *     summary: Create a new card
 *     responses:
 *       200:
 *         description: The created card
 *       500:
 *         description: Internal Server Error
 * /api/cards/id/{id}:
 *   put:
 *     summary: Update a card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The updated card
 *       404:
 *         description: Card not found
 *       500:
 *         description: Internal Server Error
 * /api/cards/number/{number}:
 *   get:
 *     summary: Retrieve a card by number
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A card object
 *       404:
 *         description: Card not found
 *       500:
 *         description: Internal Server Error
 * /api/cards/id/{id}:
 *   delete:
 *     summary: Delete a card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted card
 *       404:
 *         description: Card not found
 *       500:
 *         description: Internal Server Error
 */

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
