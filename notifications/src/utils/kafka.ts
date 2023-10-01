import { Kafka } from 'kafkajs';

const brokers = ['0.0.0.0:9092'];
const topics = ['message-created'] as const;

const kafka = new Kafka({
  clientId: 'notifications-service',
  brokers
});

const consumer = kafka.consumer({
  groupId: 'notifications-service'
});

const connectConsumer = async () => {
  await consumer.connect();
  console.log('Consumer connected');

  topics.forEach((topic) => consumer.subscribe({ topic, fromBeginning: true }));

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message?.value) return;

      const data = JSON.parse(message.value.toString());

      const handler = {
        'message-created': () => console.log('Got a new message', JSON.stringify(data, null, 2))
      };

      if (handler[topic]) handler[topic]();
    }
  });
};

const disconnectConsumer = async () => {
  await consumer.disconnect();
  console.log('Consumer disconnected');
};

export { connectConsumer, disconnectConsumer };
