package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class RoomTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Room getRoomSample1() {
        return new Room().id(1L).name("name1");
    }

    public static Room getRoomSample2() {
        return new Room().id(2L).name("name2");
    }

    public static Room getRoomRandomSampleGenerator() {
        return new Room().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
