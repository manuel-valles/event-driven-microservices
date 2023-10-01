import { connectDB } from './utils/db';
import { connectProducer, disconnectProvider } from './utils/kafka';
import { createServer } from './utils/server';
import { FastifyInstance } from 'fastify';

const gracefulShutdown = async (app: FastifyInstance) => {
  console.log('Shutting down...');

  await app.close();
  await disconnectProvider();

  process.exit(0);
};

(async () => {
  const app = createServer();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  await connectDB();
  await connectProducer();
  await app.listen({ port, host: '0.0.0.0' });

  const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'] as const;

  signals.forEach((signal) => process.on(signal, () => gracefulShutdown(app)));

  console.log(`Messages service running at http://localhost:${port}`);
})();
