import { TransactionControllerFactory } from '@/application/factories';
import { Router, Request, Response } from 'express';

const TransactionRoutes = Router();
const transactionController = TransactionControllerFactory();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Retrieve all transactions
 *     responses:
 *       200:
 *         description: A list of transactions
 *       500:
 *         description: Internal Server Error
 * /api/transactions/id/{id}:
 *   get:
 *     summary: Retrieve a transaction by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A transaction object
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal Server Error
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     responses:
 *       200:
 *         description: The created transaction
 *       500:
 *         description: Internal Server Error
 * /api/transactions/id/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The updated transaction
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal Server Error
 * /api/transactions/client/{id}:
 *   get:
 *     summary: Retrieve transactions by client ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of transactions
 *       500:
 *         description: Internal Server Error
 * /api/transactions/id/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted transaction
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal Server Error
 */

TransactionRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const transactions = await transactionController.findAll();
    res.send(transactions);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

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

TransactionRoutes.get('/client/:id', async (req: Request, res: Response) => {
  try {
    const transactions = await transactionController.findByClientId(
      Number(req.params.id),
    );
    res.send(transactions);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

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
