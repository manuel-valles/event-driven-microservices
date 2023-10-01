import fastify from 'fastify';
import { routes } from '../routes';

export const createServer = () => {
  const app = fastify();

  app.register(routes, { prefix: '/api/v1/messages' });

  return app;
};
