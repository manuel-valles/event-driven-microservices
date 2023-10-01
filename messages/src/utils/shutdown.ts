import { FastifyInstance } from 'fastify';
import { disconnectProvider } from './kafka';

const errorTypes = ['unhandledRejection', 'uncaughtException'] as const;
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'] as const;

export const gracefulShutdown = async (app: FastifyInstance) => {
  errorTypes.forEach((type) => {
    process.on(type, async () => {
      console.log(`Shutting down due to error '${type}'...`);
      try {
        await app.close();
        await disconnectProvider();
        process.exit(0);
      } catch (_) {
        process.exit(1);
      }
    });
  });

  signalTraps.forEach((type) =>
    process.once(type, async () => {
      console.log(`Shutting down due to signal trap '${type}'...`);
      try {
        await app.close();
        await disconnectProvider();
      } finally {
        process.kill(process.pid, type);
      }
    })
  );
};
