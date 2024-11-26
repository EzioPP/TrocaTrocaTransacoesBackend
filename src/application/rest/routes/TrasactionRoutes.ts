import { ClientControllerFactory, PixControllerFactory, TransactionControllerFactory } from '@/application/factories';
import { Router, Request, Response } from 'express';
import protect from '../middleware/Protect';
import { can } from '../middleware/Permission';
import { Client, Transaction, User } from '@/domain/entities';


const TransactionRoutes = Router();
const transactionController = TransactionControllerFactory();
const clientController = ClientControllerFactory();
const pixController = PixControllerFactory();

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
TransactionRoutes.post('/transaction',
  protect,
  can('user'),
  async (req: Request, res: Response) => {
    console.log('Request:', req.body);
    try {
      const user: User = req.user as User;
      const client = await clientController.findById(user.clientId);
      if (!client) {
        return res.status(404).send({ error: 'Client not found' });
      }
      req.body.clientId = user.clientId;
      const transactionDate = new Date();
      const saoPauloOffset = -3 * 60;
      const saoPauloTime = new Date(transactionDate.getTime() + saoPauloOffset * 60 * 1000);
      req.body.transactionDate = saoPauloTime

      console.log(req.body);
      const newTransaction: Transaction = req.body;
      if (newTransaction.type === 'Deposito') {

        client.balance += newTransaction.value;

        const updatedClient = await clientController.update(client);
        if (!updatedClient) {
          return res.status(404).send({ error: 'Client not found' });
        }
        const result = await transactionController.save(newTransaction);
        console.log('Transaction:', result);
        return res.send(updatedClient);
      }

      if (newTransaction.type === 'Saque') {

        if (client.balance < newTransaction.value) {
          return res.status(400).send({ error: 'Insufficient balance' });
        }
        newTransaction.value = -newTransaction.value;
        client.balance += newTransaction.value;

        const updatedClient = await clientController.update(client);
        if (!updatedClient) {
          return res.status(404).send({ error: 'Client not found' });
        }
        const result = await transactionController.save(newTransaction);
        console.log('Transaction:', result);
        return res.send(updatedClient);
      }
      if (client.balance < newTransaction.value) {
        return res.status(400).send({ error: 'Insufficient balance' });
      }
      newTransaction.value = -newTransaction.value;
      console.log('New transaction:', newTransaction);

      let clients;
      switch (req.body.keyType) {
        case 'CPF':
          clients = await clientController.findByCpf(req.body.key);
          break;
        case 'Email':
          clients = await clientController.findByEmail(req.body.key);
          break;
        case 'Phone':
          clients = await clientController.findByPhone(req.body.key);
          break;
        default:
          return res.status(400).send({ error: 'Invalid key type' });
      }

      if (!clients) {
        return res.status(404).send({ error: 'Client not found' });
      }
      console.log('Client:', clients);

      const pixs = await pixController.findByClientId(clients.clientId);
      if (!pixs || pixs[0].keyType !== req.body.keyType) {
        return res.status(404).send({ error: 'Pix not found' });
      }
      console.log('Pix:', pixs);
    }
    catch (error) {

      res.status(500).send({ error: 'Internal Server Error' });
    }

  }
);
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
