import express from 'express';
import dotenv from 'dotenv';
import { logger } from '../../infra/logger/logger';
import HomeRoutes from './routes/HomeRoutes';
import ClientRoutes from './routes/ClientRoutes';

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

app.use('/api/', HomeRoutes);
app.use('/api/client/', ClientRoutes);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
