import { config } from './app';
import rateLimit from 'express-rate-limit';

const errorResponse = {
  error: {
    message: 'Too many requests from this IP, please try again later.',
  },
};

const rateLimiterConfig = rateLimit({
  windowMs: config.rateLimitWindowMs || 15 * 60 * 1000,
  max: config.rateLimitMax || 100,
  message: errorResponse,
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiterConfig;
