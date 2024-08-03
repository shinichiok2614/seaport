package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ParagraphTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Paragraph getParagraphSample1() {
        return new Paragraph().id(1L).caption("caption1").contentType("contentType1");
    }

    public static Paragraph getParagraphSample2() {
        return new Paragraph().id(2L).caption("caption2").contentType("contentType2");
    }

    public static Paragraph getParagraphRandomSampleGenerator() {
        return new Paragraph()
            .id(longCount.incrementAndGet())
            .caption(UUID.randomUUID().toString())
            .contentType(UUID.randomUUID().toString());
    }
}
