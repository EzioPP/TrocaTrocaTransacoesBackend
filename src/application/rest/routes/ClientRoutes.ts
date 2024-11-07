import { ClientControllerFactory } from '../../factories/ClientControllerFactory';

import { Router, Request, Response } from 'express';

const ClientRoutes = Router();
const clientController = ClientControllerFactory();

ClientRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const clients = await clientController.findAll();
    res.send(clients);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

ClientRoutes.get('/id/:id', async (req: Request, res: Response) => {
  try {
    const client = await clientController.findById(Number(req.params.id));
    if (!client) {
      res.status(404).send({ error: 'Client not found' });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

ClientRoutes.post('/email/', async (req: Request, res: Response) => {
  try {
    const client = await clientController.findByEmail(req.body.email);
    if (!client) {
      res.status(404).send({ error: 'Client not found' });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

ClientRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const client = await clientController.save(req.body);
    res.send(client);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

ClientRoutes.put('/id/:id', async (req: Request, res: Response) => {
  try {
    const client = await clientController.update(req.body);
    if (!client) {
      res.status(404).send({ error: 'Client not found' });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

ClientRoutes.delete('/id/:id', async (req: Request, res: Response) => {
  try {
    const client = await clientController.delete(Number(req.params.id));
    if (!client) {
      res.status(404).send({ error: 'Client not found' });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default ClientRoutes;