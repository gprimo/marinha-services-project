package com.example.spring.consumer.viewmodel;

import com.example.spring.consumer.dto.AeronaveDto;
import com.example.spring.consumer.modelo.Aeronave;
import com.example.spring.consumer.repository.AeronaveRepository;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

public class AeronaveViewModel {

    @NotNull @NotEmpty
    private String origin_country;
    @NotNull @NotEmpty
    private String icao24;
    @NotNull @NotEmpty
    private int last_contact;
    @NotNull @NotEmpty
    private double longitude;
    @NotNull @NotEmpty
    private double latitude;
    @NotNull @NotEmpty
    private double velocity;
    @NotNull @NotEmpty
    private double true_track;

    public String getIcao24() { return icao24; }

    public void setIcao24(String icao24) { this.icao24 = icao24; }

    public String getOrigin_country() {
        return origin_country;
    }

    public void setOrigin_country(String origin_country) {
        this.origin_country = origin_country;
    }

    public int getLast_contact() {
        return last_contact;
    }

    public void setLast_contact(int last_contact) {
        this.last_contact = last_contact;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getVelocity() {
        return velocity;
    }

    public void setVelocity(double velocity) {
        this.velocity = velocity;
    }

    public double getTrue_track() {
        return true_track;
    }

    public void setTrue_track(double true_track) {
        this.true_track = true_track;
    }

    public Aeronave converter() {
        return new Aeronave(origin_country, icao24, last_contact, longitude, latitude, velocity, true_track);
    }

    public Aeronave atualizar(Long id, AeronaveRepository aeronaveRepository) {
        Aeronave aeronave = aeronaveRepository.getOne(id);

        aeronave.setLatitude(this.latitude);
        aeronave.setLongitude(this.longitude);
        aeronave.setLast_contact(this.last_contact);
        aeronave.setVelocity(this.velocity);
        aeronave.setOrigin_country(this.origin_country);
        aeronave.setTrue_track(this.true_track);

        return aeronave;
    }


}

