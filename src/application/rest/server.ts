import express from 'express';
import dotenv from 'dotenv';
import { logger } from '@/infra/logger/logger';

import HomeRoutes from './routes/HomeRoutes';
import ClientRoutes from './routes/ClientRoutes';
import PixRoutes from './routes/PixRoutes';
import ReportRoutes from './routes/ReportRoutes';
import TransactionRoutes from './routes/TrasactionRoutes';
import UserRoutes from './routes/UserRoutes';


dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

app.use('/api/', HomeRoutes);
app.use('/api/client/', ClientRoutes);
app.use('/api/pix/', PixRoutes);
app.use('/api/report/', ReportRoutes);
app.use('/api/transaction/', TransactionRoutes);
app.use('/api/user/', UserRoutes);


app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
