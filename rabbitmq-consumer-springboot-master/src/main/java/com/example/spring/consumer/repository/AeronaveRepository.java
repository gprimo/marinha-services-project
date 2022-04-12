package com.example.spring.consumer.repository;

import com.example.spring.consumer.modelo.Aeronave;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AeronaveRepository extends JpaRepository<Aeronave, Long> {

    Aeronave findByIcao24(String icao24);
}
