import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import contactsRouter from './routes/contacts.js';
import authRouter from './routes/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Public Routes
  app.get('/', (req, res) => {
    res.json({
      message: 'Node.js MongoDB API - hw5-auth',
      version: '1.0.0',
      status: 'API is running successfully!',
      endpoints: {
        auth: {
          register: 'POST /auth/register',
          login: 'POST /auth/login', 
          refresh: 'POST /auth/refresh',
          logout: 'POST /auth/logout'
        },
        contacts: {
          list: 'GET /contacts (Protected)',
          create: 'POST /contacts (Protected)',
          getById: 'GET /contacts/:id (Protected)',
          update: 'PATCH /contacts/:id (Protected)',
          delete: 'DELETE /contacts/:id (Protected)'
        }
      }
    });
  });

  // Protected Routes
  app.use(authRouter);
  app.use(contactsRouter);

  // 404 handler for non-existing routes
  app.use(notFoundHandler);

  // Error handler
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Handle server errors
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
    } else {
      console.error('Server error:', error);
      throw error;
    }
  });

  return app;
};
