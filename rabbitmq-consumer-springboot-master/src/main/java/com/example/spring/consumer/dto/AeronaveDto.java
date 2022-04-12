package com.example.spring.consumer.dto;

import com.example.spring.consumer.modelo.Aeronave;

import java.util.List;
import java.util.stream.Collectors;

public class AeronaveDto {

    private Long id;
    private String origin_country;
    private String icao24;
    private int last_contact;
    private double longitude;
    private double latitude;
    private double velocity;
    private double true_track;

    public AeronaveDto(Aeronave aeronave) {
        this.id = aeronave.getId();
        this.icao24 = aeronave.getIcao24();
        this.origin_country = aeronave.getOrigin_country();
        this.last_contact = aeronave.getLast_contact();
        this.longitude = aeronave.getLongitude();
        this.latitude = aeronave.getLatitude();
        this.velocity = aeronave.getVelocity();
        this.true_track = aeronave.getTrue_track();
    }

    public Long getId() {
        return id;
    }

    public String getOrigin_country() { return origin_country; }

    public int getLast_contact() { return last_contact; }

    public double getLongitude() {
        return longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getVelocity() {
        return velocity;
    }

    public double getTrue_track() {
        return true_track;
    }

    public static List<AeronaveDto> converter(List<Aeronave> aeronaves) {
        return aeronaves.stream().map(AeronaveDto::new).collect(Collectors.toList());
    }


}