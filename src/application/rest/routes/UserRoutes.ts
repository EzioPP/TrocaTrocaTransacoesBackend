import { UserControllerFactory } from '@/application/factories';
import { User } from '@/domain/entities';
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
    console.log(req.body);
    const userReceived: User = req.body;
    console.log(userReceived);
    const userCreated = await userControllerFactory.save(userReceived);
    res.send(userCreated);
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
    const token = await userControllerFactory.login(
      req.body.username,
      req.body.password,
    );

    if (!token) {
      return res.status(500).send({ error: 'Internal Server Error' });
    } else if (token === '404') {
      return res.status(404).send({ error: 'User not found' });
    } else if (token === '401') {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 * 1000,
    });
    return res.send({ message: 'User logged in' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default UserRoutes;
