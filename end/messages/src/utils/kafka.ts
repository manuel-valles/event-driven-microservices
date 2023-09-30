import { Partitioners, Kafka } from 'kafkajs';

const brokers = ['0.0.0.0:9092'];

const kafka = new Kafka({
  clientId: 'messages-app',
  brokers
});

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner
});

const connectProducer = async () => {
  await producer.connect();
  console.log('Producer connected');
};

const disconnectFromKafka = async () => {
  await producer.disconnect();
  console.log('Producer disconnected');
};

const topics = ['message-created'] as const;

const sendMessage = async (topic: (typeof topics)[number], message: string | Buffer) => {
  return producer.send({
    topic,
    messages: [{ value: message }]
  });
};

export { connectProducer, disconnectFromKafka, sendMessage };
