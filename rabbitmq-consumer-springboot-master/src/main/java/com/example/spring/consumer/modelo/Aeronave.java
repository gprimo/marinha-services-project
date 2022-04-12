package com.example.spring.consumer.modelo;

import com.example.spring.consumer.dto.AeronaveDto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Aeronave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String icao24;
    private String origin_country;
    private int last_contact;
    private double longitude;
    private double latitude;
    private double velocity;
    private double true_track;

    public Aeronave() { }

    public Aeronave(String origin_country, String icao24, int last_contact, double longitude, double latitude, double velocity, double true_track) {
        this.origin_country = origin_country;
        this.last_contact = last_contact;
        this.longitude = longitude;
        this.latitude = latitude;
        this.velocity = velocity;
        this.true_track = true_track;
        this.icao24 = icao24;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getIcao24() { return icao24; }

    public void setIcao24(String icao24) { this.icao24 = icao24; }
}
