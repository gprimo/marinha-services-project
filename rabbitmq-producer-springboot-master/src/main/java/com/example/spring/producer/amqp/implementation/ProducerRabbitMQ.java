package com.example.spring.producer.amqp.implementation;

import com.example.spring.producer.amqp.AmqpProducer;
import com.example.spring.producer.dto.Aeronave;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ProducerRabbitMQ implements AmqpProducer<Aeronave> {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${spring.rabbitmq.request.routing-key.producer}")
    private String queue;

    @Value("${spring.rabbitmq.request.exchenge.producer}")
    private String exchange;

    @Override
    public void producer(Aeronave aeronave) {
        try {
            rabbitTemplate.convertAndSend(exchange, queue, aeronave);
        } catch (Exception ex) {
            throw new AmqpRejectAndDontRequeueException(ex);
        }
    }
}
