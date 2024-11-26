import { ReportControllerFactory } from '@/application/factories';
import { Router, Request, Response } from 'express';
import protect from '../middleware/Protect';
import { can } from '../middleware/Permission';

const reportRoutes = Router();

const reportController = ReportControllerFactory();

reportRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const reports = await reportController.findAll();
    res.send(reports);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

reportRoutes.get('/id/:id', async (req: Request, res: Response) => {
  try {
    const report = await reportController.findById(Number(req.params.id));
    if (!report) {
      res.status(404).send({ error: 'Report not found' });
    }
    res.send(report);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

reportRoutes.post(
  '/',

  async (req: Request, res: Response) => {
    try {
      const report = await reportController.save(req.body);
      res.send(report);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  },
);

reportRoutes.post('/client/byDate',
  protect,
  can('user'),

);


reportRoutes.put('/id/:id', async (req: Request, res: Response) => {
  try {
    const report = await reportController.update(req.body);
    if (!report) {
      res.status(404).send({ error: 'Report not found' });
    }
    res.send(report);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

reportRoutes.get('/client/:id', async (req: Request, res: Response) => {
  try {
    const reports = await reportController.findByClientId(
      Number(req.params.id),
    );
    res.send(reports);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

reportRoutes.delete('/id/:id', async (req: Request, res: Response) => {
  try {
    const report = await reportController.delete(Number(req.params.id));
    if (!report) {
      res.status(404).send({ error: 'Report not found' });
    }
    res.send(report);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default reportRoutes;
