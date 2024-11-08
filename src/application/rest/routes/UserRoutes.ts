import { UserControllerFactory } from '@/application/factories';
import { Router, Request, Response } from 'express';

const UserRoutes = Router();

const userControllerFactory = UserControllerFactory();

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