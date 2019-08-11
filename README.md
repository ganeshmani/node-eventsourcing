# MicroService -EventSourcing Implementation using Node.js,Kafka

### Technologies Used

    - Node.js
    - Kafka
    - MongoDB


### Dependencies

    - [Node.js](https://nodejs.org/en/download/)
    - [Kafka](https://kafka.apache.org/downloads)


### To Run Application

#### Kafka

```

$ bin/zookeeper-server-start.sh config/zookeeper.properties
$  bin/kafka-server-start.sh config/server.properties

```

#### Producer
```

$ cd node-kafka-producer/
$ npm i 
$ node server.js

```

#### Consumer
```

$ cd node-kafka-consumer/
$ npm i
$ node server.js

```