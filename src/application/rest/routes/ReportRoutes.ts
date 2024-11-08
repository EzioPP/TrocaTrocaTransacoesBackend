import { ReportControllerFactory } from '@/application/factories';
import { Router, Request, Response } from 'express';

const reportRoutes = Router();

const reportController = ReportControllerFactory();

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Retrieve all reports
 *     responses:
 *       200:
 *         description: A list of reports
 *       500:
 *         description: Internal Server Error
 * /api/reports/id/{id}:
 *   get:
 *     summary: Retrieve a report by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A report object
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal Server Error
 * /api/reports:
 *   post:
 *     summary: Create a new report
 *     responses:
 *       200:
 *         description: The created report
 *       500:
 *         description: Internal Server Error
 * /api/reports/id/{id}:
 *   put:
 *     summary: Update a report by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The updated report
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal Server Error
 * /api/reports/client/{id}:
 *   get:
 *     summary: Retrieve reports by client ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of reports
 *       500:
 *         description: Internal Server Error
 * /api/reports/id/{id}:
 *   delete:
 *     summary: Delete a report by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted report
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal Server Error
 */

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

reportRoutes.post('/', 
  
  async (req: Request, res: Response) => {
  try {
    const report = await reportController.save(req.body);
    res.send(report);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

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