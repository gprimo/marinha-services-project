package com.example.spring.consumer.amqp.implementation;

import com.example.spring.consumer.amqp.AmqpConsumer;
import com.example.spring.consumer.dto.AeronaveDto;
import com.example.spring.consumer.service.ConsumerService;
import com.example.spring.consumer.viewmodel.AeronaveViewModel;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQConsumer implements AmqpConsumer<AeronaveViewModel> {

    @Autowired
    private ConsumerService consumerService;

    @Override
    @RabbitListener(queues = "${spring.rabbitmq.request.routing-key.producer}")
    public void consumer(AeronaveViewModel aeronaveViewModel) {
        try {
            consumerService.action(aeronaveViewModel);
        } catch (Exception ex) {
            throw new AmqpRejectAndDontRequeueException(ex);
        }
    }
}
