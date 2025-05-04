import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/app';
import { errorHandler } from './middlewares/errorHandler';
import { apiRoutes } from './routes';
import { notFoundHandler } from './middlewares/notFoundHandler';
import rateLimiter from './config/rateLimiter';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Apply rate limiting to all routes
app.use(rateLimiter);

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
