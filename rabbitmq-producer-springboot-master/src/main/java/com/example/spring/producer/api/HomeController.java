package com.example.spring.producer.api;

import com.example.spring.producer.dto.Aeronave;
import com.example.spring.producer.dto.State;
import com.example.spring.producer.service.AmqpService;
import com.example.spring.producer.service.ServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
public class HomeController {

    private final ServiceLayer serviceLayer;

    @Autowired
    public HomeController(ServiceLayer serviceLayer) {
        this.serviceLayer = serviceLayer;
    }

    @Autowired
    private AmqpService service;

    @GetMapping("/aeronaves")
    public void getAirPlaneData() {

        State state = serviceLayer.consumeAirPlaneAPI();

        int y = state.getStates().length;
        int i = 0;

        while (i < y) {
            Aeronave airplane = new Aeronave();

            airplane.setIcao24((String) state.getStates()[i][0]);
            airplane.setOrigin_country((String) state.getStates()[i][2]);
            airplane.setLast_contact((int) state.getStates()[i][4]);
            airplane.setLatitude((Number)state.getStates()[i][5]);
            airplane.setLongitude((Number) state.getStates()[i][6]);
            airplane.setVelocity((Number) state.getStates()[i][9]);
            airplane.setTrue_track((Number) state.getStates()[i][10]);

            service.sendToConsumer(airplane);
            i++;
        }
    }
}
