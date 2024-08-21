package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.RoomMemberTestSamples.*;
import static com.mycompany.myapp.domain.RoomTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RoomMemberTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoomMember.class);
        RoomMember roomMember1 = getRoomMemberSample1();
        RoomMember roomMember2 = new RoomMember();
        assertThat(roomMember1).isNotEqualTo(roomMember2);

        roomMember2.setId(roomMember1.getId());
        assertThat(roomMember1).isEqualTo(roomMember2);

        roomMember2 = getRoomMemberSample2();
        assertThat(roomMember1).isNotEqualTo(roomMember2);
    }

    @Test
    void roomTest() {
        RoomMember roomMember = getRoomMemberRandomSampleGenerator();
        Room roomBack = getRoomRandomSampleGenerator();

        roomMember.setRoom(roomBack);
        assertThat(roomMember.getRoom()).isEqualTo(roomBack);

        roomMember.room(null);
        assertThat(roomMember.getRoom()).isNull();
    }
}
