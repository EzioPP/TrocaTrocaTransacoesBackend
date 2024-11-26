import express from 'express';
import { logger } from '../../infra/logger/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import protect from './middleware/Protect';
import HomeRoutes from './routes/HomeRoutes';
import ClientRoutes from './routes/ClientRoutes';
import PixRoutes from './routes/PixRoutes';
import ReportRoutes from './routes/ReportRoutes';
import TransactionRoutes from './routes/TrasactionRoutes';
import UserRoutes from './routes/UserRoutes';
import CardRoutes from './routes/CardRoutes';
import ImageRoutes from './routes/ImageRoutes';
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const app = express();
const port = process.env.SERVER_PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
/* app.use(protect); */
app.use('/api/', HomeRoutes);
app.use('/api/client/', ClientRoutes);
app.use('/api/card/', CardRoutes);
app.use('/api/pix/', PixRoutes);
app.use('/api/report/', ReportRoutes);
app.use('/api/transaction/', TransactionRoutes);
app.use('/api/user/', UserRoutes);
app.use('/api/image/', ImageRoutes);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
