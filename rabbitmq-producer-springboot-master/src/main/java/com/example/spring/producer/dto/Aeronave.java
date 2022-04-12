package com.example.spring.producer.dto;

import java.text.DecimalFormat;

public class Aeronave {

    private String origin_country;
    private String icao24;
    private int last_contact;
    private Number longitude;
    private Number latitude;
    private Number velocity;
    private Number true_track;

    public Aeronave() { }
    public String getIcao24() {
        return icao24;
    }

    public void setIcao24(String icao24) { this.icao24 = icao24; }

    public String getOrigin_country() {
        return origin_country;
    }

    public void setOrigin_country(String origin_country) {
        this.origin_country = origin_country;
    }

    public int getLast_contact() { return last_contact; }

    public void setLast_contact(int last_contact) {
        this.last_contact = last_contact;
    }

    public Number getLongitude() {
        return longitude;
    }

    public void setLongitude(Number longitude) {
        this.longitude = longitude;
    }

    public Number getLatitude() {
        return latitude;
    }

    public void setLatitude(Number latitude) {
        this.latitude = latitude;
    }

    public Number getVelocity() {
        return velocity;
    }

    public void setVelocity(Number velocity) {
        this.velocity = velocity;
    }

    public Number getTrue_track() {
        return true_track;
    }

    public void setTrue_track(Number true_track) {
        this.true_track = true_track;
    }
}
