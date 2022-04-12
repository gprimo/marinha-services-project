package com.example.spring.producer.service;

import com.example.spring.producer.dto.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ServiceLayer {

    private final RestTemplate restTemplate;

    @Autowired
    public ServiceLayer(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public State consumeAirPlaneAPI() {
        return restTemplate.getForObject(
                "https://opensky-network.org/api/states/all",
                State.class);
    }
}
