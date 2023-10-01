import { connectConsumer } from './utils/kafka';
import { createServer } from './utils/server';
import { gracefulShutdown } from './utils/shutdown';

(async () => {
  const app = createServer();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

  await connectConsumer();
  await app.listen({ port, host: '0.0.0.0' });

  await gracefulShutdown(app);

  console.log(`Notifications service running at http://localhost:${port}`);
})();
