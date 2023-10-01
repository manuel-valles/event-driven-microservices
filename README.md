# Event Driven Microservices with NodeJS and KafkaJS

## Description

This is a simple project to demonstrate how to use KafkaJS to create a simple event driven microservice architecture.

## Conduktor

**Conduktor** is a great tool to manage your Kafka cluster. You can configure your cluster, create topics, produce and consume messages,...
with just a configuration file:

- https://docs.conduktor.io/platform/installation/get-started/docker/#configuration-using-environment-variables
- https://github.com/conduktor/kafka-stack-docker-compose

> NOTE: You can also launch Conduktor with a preconfigured Kafka (Redpanda): https://www.conduktor.io/get-started/

## Kafka

**Kafka** is a distributed streaming platform. It is used to build real-time data pipelines and streaming apps.
It is horizontally scalable, fault-tolerant, wicked fast, and runs in production in thousands of companies.

- https://kafka.apache.org
- https://kafka.js.org/docs/getting-started

### Kafka terminology

- **Producer**: A process that can publish messages to a Kafka topic.
- **Consumer**: A process that can subscribe to one or more topics and consume messages published to them.
- **Topic**: A category or feed name to which records are published.
- **Partition**: A topic can have one or more partitions depending on the configuration. Each partition is an ordered,
  immutable sequence of records that is continually appended to a structured commit log. The records in the partitions are each assigned a sequential id number called the offset that uniquely identifies each record within the partition.
- **Offset**: A unique identifier of a record within a partition.
- **Broker**: A server that runs in a Kafka cluster.
- **Cluster**: A group of brokers is called a Kafka cluster.
- **Consumer group**: A consumer group is a group of consumer processes that share a common group identifier.
- **Leader**: The leader of a partition is one of the brokers in the partition preferred leader election.
- **Replicas**: Replicas are copies of a partition. Replicas are never read or written to. They are used to prevent data loss.
