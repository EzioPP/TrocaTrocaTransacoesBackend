import { Pix } from '@/domain/entities';
import { PixControllerFactory } from '@/application/factories';

import { Router, Request, Response } from 'express';

/**
 * @swagger
 * /api/pix:
 *   get:
 *     summary: Retrieve all pix
 *     responses:
 *       200:
 *         description: A list of pix
 *       500:
 *         description: Internal Server Error
 * /api/pix/id/{id}:
 *   get:
 *     summary: Retrieve a pix by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A pix object
 *       404:
 *         description: Pix not found
 *       500:
 *         description: Internal Server Error
 * /api/pix:
 *   post:
 *     summary: Create a new pix
 *     responses:
 *       200:
 *         description: The created pix
 *       500:
 *         description: Internal Server Error
 * /api/pix/id/{id}:
 *   put:
 *     summary: Update a pix by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The updated pix
 *       404:
 *         description: Pix not found
 *       500:
 *         description: Internal Server Error
 * /api/pix/key/{key}:
 *   get:
 *     summary: Retrieve a pix by key
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A pix object
 *       404:
 *         description: Pix not found
 *       500:
 *         description: Internal Server Error
 * /api/pix/id/{id}:
 *   delete:
 *     summary: Delete a pix by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted pix
 *       404:
 *         description: Pix not found
 *       500:
 *         description: Internal Server Error
 */

const PixRoutes = Router();
const pixController = PixControllerFactory();

PixRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const pix = await pixController.findAll();
    res.send(pix);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

PixRoutes.get('/id/:id', async (req: Request, res: Response) => {
  try {
    const pix = await pixController.findById(Number(req.params.id));
    if (!pix) {
      res.status(404).send({ error: 'Pix not found' });
    }
    res.send(pix);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

PixRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const pix = await pixController.save(req.body);
    res.send(pix);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

PixRoutes.put('/id/:id', async (req: Request, res: Response) => {
  try {
    const pix = await pixController.update(req.body);
    if (!pix) {
      res.status(404).send({ error: 'Pix not found' });
    }
    res.send(pix);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

PixRoutes.get('/key/:key', async (req: Request, res: Response) => {
  try {
    const pix = await pixController.findByKey(req.params.key);
    if (!pix) {
      res.status(404).send({ error: 'Pix not found' });
    }
    res.send(pix);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

PixRoutes.delete('/id/:id', async (req: Request, res: Response) => {
  try {
    const pix = await pixController.delete(Number(req.params.id));
    if (!pix) {
      res.status(404).send({ error: 'Pix not found' });
    }
    res.send(pix);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default PixRoutes;
