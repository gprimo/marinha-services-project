package com.example.spring.producer.dto;

import java.util.List;

public class State {

    private long time;
    private Object[][] states;

    public long getTime() {
        return time;
    }
    public void setTime(long time) {
        this.time = time;
    }
    public Object[][] getStates() {
        return states;
    }
    public void setStates(Object[][] states) {
        this.states = states;
    }
}
