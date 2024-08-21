package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.RoomMemberAsserts.*;
import static com.mycompany.myapp.domain.RoomMemberTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RoomMemberMapperTest {

    private RoomMemberMapper roomMemberMapper;

    @BeforeEach
    void setUp() {
        roomMemberMapper = new RoomMemberMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getRoomMemberSample1();
        var actual = roomMemberMapper.toEntity(roomMemberMapper.toDto(expected));
        assertRoomMemberAllPropertiesEquals(expected, actual);
    }
}
