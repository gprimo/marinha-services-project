package com.example.spring.consumer.service.implementation;

import com.example.spring.consumer.dto.AeronaveDto;
import com.example.spring.consumer.modelo.Aeronave;
import com.example.spring.consumer.repository.AeronaveRepository;
import com.example.spring.consumer.service.ConsumerService;
import com.example.spring.consumer.viewmodel.AeronaveViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsumerServiceImpl implements ConsumerService {

    @Autowired
    private AeronaveRepository aeronaveRepository;

    @Override
    public void action(AeronaveViewModel aeronaveViewModel) {
        Aeronave aeronave = aeronaveViewModel.converter();
        Aeronave aeronaveRepo = aeronaveRepository.findByIcao24(aeronaveViewModel.getIcao24());

        if (aeronaveRepo == null) {
            aeronaveRepository.save(aeronave);
        }
    }
}
