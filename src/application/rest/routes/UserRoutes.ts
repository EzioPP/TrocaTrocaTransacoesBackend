import { UserControllerFactory } from '@/application/factories';
import { Router, Request, Response } from 'express';

const UserRoutes = Router();

const userControllerFactory = UserControllerFactory();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal Server Error
 * /api/users/id/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       200:
 *         description: The created user
 *       500:
 *         description: Internal Server Error
 * /api/users/id/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The updated user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 * /api/users/id/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

UserRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userControllerFactory.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

UserRoutes.get('/id/:id', async (req: Request, res: Response) => {
  try {
    const user = await userControllerFactory.findById(Number(req.params.id));
    if (!user) {
      res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

UserRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const user = await userControllerFactory.save(req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

UserRoutes.put('/id/:id', async (req: Request, res: Response) => {
  try {
    const user = await userControllerFactory.update(req.body);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

UserRoutes.delete('/id/:id', async (req: Request, res: Response) => {
  try {
    const user = await userControllerFactory.delete(Number(req.params.id));
    if (!user) {
      res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

UserRoutes.post('/login', async (req: Request, res: Response) => {
    try {

        const response = await userControllerFactory.login(
        req.body.username,
        req.body.password,
        );

        if (!response) {
          res.status(500).send({ error: 'Internal Server Error' });
        }
        if (response === '404'){
          res.status(404).send({ error: 'User not found' });
        }
        if (response === '401'){
          res.status(401).send({ error: 'Unauthorized' });
        }
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

export default UserRoutes;