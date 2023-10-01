import { connectDB } from './utils/db';
import { connectProducer } from './utils/kafka';
import { createServer } from './utils/server';
import { gracefulShutdown } from './utils/shutdown';

(async () => {
  const app = createServer();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  await connectDB();
  await connectProducer();
  await app.listen({ port, host: '0.0.0.0' });

  await gracefulShutdown(app);

  console.log(`Messages service running at http://localhost:${port}`);
})();
