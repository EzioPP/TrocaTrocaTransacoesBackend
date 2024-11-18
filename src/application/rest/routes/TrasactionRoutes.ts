import { TransactionControllerFactory } from '@/application/factories';
import { Router, Request, Response } from 'express';
import protect from '../middleware/Protect';
import { can } from '../middleware/Permission';
import { User } from '@/domain/entities';

const TransactionRoutes = Router();
const transactionController = TransactionControllerFactory();

TransactionRoutes.get(
  '/',
  protect,
  can('user'),
  async (req: Request, res: Response) => {
    try {
      const transactions = await transactionController.findAll();
      res.send(transactions);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  },
);

TransactionRoutes.get('/id/:id', async (req: Request, res: Response) => {
  try {
    const transaction = await transactionController.findById(
      Number(req.params.id),
    );
    if (!transaction) {
      res.status(404).send({ error: 'Transaction not found' });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

TransactionRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const transaction = await transactionController.save(req.body);
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

TransactionRoutes.put('/id/:id', async (req: Request, res: Response) => {
  try {
    const transaction = await transactionController.update(req.body);
    if (!transaction) {
      res.status(404).send({ error: 'Transaction not found' });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

TransactionRoutes.get(
  '/client',
  protect,
  can('user'),
  async (req: Request, res: Response) => {
    try {
      const user: User = req.user as User;
      const transactions = await transactionController.findByClientId(
        user.clientId,
      );
      res.send(transactions);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  },
);

TransactionRoutes.delete('/id/:id', async (req: Request, res: Response) => {
  try {
    const transaction = await transactionController.delete(
      Number(req.params.id),
    );
    if (!transaction) {
      res.status(404).send({ error: 'Transaction not found' });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default TransactionRoutes;
