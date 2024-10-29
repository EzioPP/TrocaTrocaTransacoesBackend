import { Pix } from '@/domain/entities';
import { PixControllerFactory } from '@/application/factories';

import { Router, Request, Response } from 'express';

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
