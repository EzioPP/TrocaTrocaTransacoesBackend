import {
  ClientControllerFactory,
  UserControllerFactory,
} from '@/application/factories';
import { isNumber, isEmail } from '@/infra/services';
import protect from '../middleware/Protect';
import { Router, Request, Response } from 'express';
import { can } from '../middleware/Permission';

const UserRoutes = Router();

const userControllerFactory = UserControllerFactory();
const clientControllerFactory = ClientControllerFactory();

UserRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userControllerFactory.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

UserRoutes.get(
  '/id/:id',
  protect,
  can('administrador'),
  async (req: Request, res: Response) => {
    try {
      const user = await userControllerFactory.findById(Number(req.params.id));
      if (!user) {
        res.status(404).send({ error: 'User not found' });
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  },
);

UserRoutes.post('/',
  protect,
  can('admin'),
  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const userReceived = req.body;
      console.log(userReceived);
      const checkExisting = await userControllerFactory.findByUsername(userReceived.username);
      if (checkExisting) {
        return res.status(409).send({ error: 'Username already exists' });
      }
      if (!userReceived.clientId) {
        const user = await userControllerFactory.save(userReceived);
        return res.status(200).send(user);
      }
      if (isNumber(userReceived.clientId)) {
        userReceived.clientId = Number(userReceived.clientId);
        const client = await clientControllerFactory.findById(
          userReceived.clientId,
        );
        if (!client) {
          return res.status(404).send({ error: 'Client not found' });
        }
        userReceived.clientId = client.clientId;
      }
      else if (isEmail(userReceived.clientId)) {
        const client = await clientControllerFactory.findByEmail(
          userReceived.search
        );
        if (client) {
          userReceived.clientId = client.clientId;

        }
      }
      const userCreated = await userControllerFactory.save(userReceived);
      res.status(200).send(userCreated);
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
    console.log(req.params.id);
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
    console.log(token);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 * 1000,
    });
    console.log(res.cookie);
    return res.send({ message: 'User logged in' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

UserRoutes.get('/logout', async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.send({ message: 'User logged out' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


UserRoutes.post('/new-account', async (req: Request, res: Response) => {
  try {

    const newClient = req.body.client;
    const Client = await clientControllerFactory.save(newClient);
    const newUser = req.body.user;
    if (!Client) {
      return res.status(500).send({ error: 'Internal Server Error' });
    }
    newUser.clientId = Client.clientId;
    newUser.permission = 'user';
    const User = await userControllerFactory.save(newUser);
    if (!User) {
      return res.status(500).send({ error: 'Internal Server Error' });
    }
    res.send(User);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default UserRoutes;
