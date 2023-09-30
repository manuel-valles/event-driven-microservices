import { connectToDb } from "./utils/db";
import { connectProducer, disconnectFromKafka } from "./utils/kafka";
import { createServer } from "./utils/server";

const gracefulShutdown = async (app: Awaited<ReturnType<typeof createServer>>)=> {
    console.log("Graceful shutdown");

    await app.close();
    await disconnectFromKafka();

    process.exit(0);
}

const main = async () => {
    const app = createServer();
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

    await connectToDb();
    await connectProducer();
    await app.listen({ port, host: "0.0.0.0"});

    const signals = ["SIGINT", "SIGTERM", "SIGQUIT"] as const;

    for (let i = 0; i < signals.length; i++) {
        const signal = signals[i];
        process.on(signal, () => {
            gracefulShutdown(app);
        });
    }

    console.log(`Message service ready at http://localhost:${port}`);
}

// @ts-ignore
await main();
