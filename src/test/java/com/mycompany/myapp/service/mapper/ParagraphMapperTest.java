package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.ParagraphAsserts.*;
import static com.mycompany.myapp.domain.ParagraphTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ParagraphMapperTest {

    private ParagraphMapper paragraphMapper;

    @BeforeEach
    void setUp() {
        paragraphMapper = new ParagraphMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getParagraphSample1();
        var actual = paragraphMapper.toEntity(paragraphMapper.toDto(expected));
        assertParagraphAllPropertiesEquals(expected, actual);
    }
}
