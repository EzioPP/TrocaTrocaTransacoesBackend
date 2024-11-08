import { ClientControllerFactory } from '../../factories/ClientControllerFactory';

import { Router, Request, Response } from 'express';

const ClientRoutes = Router();
const clientController = ClientControllerFactory();

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Retrieve all clients
 *     responses:
 *       200:
 *         description: A list of clients
 *       500:
 *         description: Internal Server Error
 * /api/clients/id/{id}:
 *   get:
 *     summary: Retrieve a client by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A client object
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal Server Error
 * /api/clients/email:
 *   post:
 *     summary: Retrieve a client by email
 *     responses:
 *       200:
 *         description: A client object
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal Server Error
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     responses:
 *       200:
 *         description: The created client
 *       500:
 *         description: Internal Server Error
 * /api/clients/id/{id}:
 *   put:
 *     summary: Update a client by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The updated client
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal Server Error
 * /api/clients/id/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted client
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal Server Error
 */

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
