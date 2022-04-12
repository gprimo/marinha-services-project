package com.example.spring.producer.service;

import com.example.spring.producer.dto.Aeronave;

public interface AmqpService {
    void sendToConsumer(Aeronave aeronave);
}
