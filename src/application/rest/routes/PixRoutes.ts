import { Pix, User } from '@/domain/entities';
import { PixControllerFactory } from '@/application/factories';

import { Router, Request, Response } from 'express';
import { can } from '../middleware/Permission';
import protect from '../middleware/Protect';

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

PixRoutes.get('/client',
  protect,
  can('user'),
  async (req: Request, res: Response) => {

    const user: User = req.user as User;
    try {
      const pixs = await pixController.findByClientId(user.clientId);
      console.log('Pix:', pixs);
      res.send(pixs);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
);
PixRoutes.post('/client',
  protect,
  can('user'),
  async (req: Request, res: Response) => {

    const user: User = req.user as User;
    try {
      const pix = await pixController.save({ ...req.body, clientId: user.clientId });
      res.send(pix);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
);




PixRoutes.delete('/client/:key',
  protect,
  can('user'),
  async (req: Request, res: Response) => {

    const user: User = req.user as User;
    try {
      const pixs = await pixController.findByClientId(user.clientId);
      const keytype = req.params.key;
      const pix = pixs.find((pix: Pix) => pix.keyType === keytype);
      console.log('Pix:', pix);
      console.log('Pixs:', pixs);
      console.log('Key:', keytype);
      if (!pix) {
        return res.status(404).send({ error: 'Pix not found' });
      }
      if (pix?.pixId !== undefined) {
        const deleted = await pixController.delete(pix.pixId);
        return res.send(deleted);
      } else {
        return res.status(404).send({ error: 'Pix not found' });

      }
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
);

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
