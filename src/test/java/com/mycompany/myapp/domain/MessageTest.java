package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.MessageTestSamples.*;
import static com.mycompany.myapp.domain.RoomMemberTestSamples.*;
import static com.mycompany.myapp.domain.RoomTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MessageTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Message.class);
        Message message1 = getMessageSample1();
        Message message2 = new Message();
        assertThat(message1).isNotEqualTo(message2);

        message2.setId(message1.getId());
        assertThat(message1).isEqualTo(message2);

        message2 = getMessageSample2();
        assertThat(message1).isNotEqualTo(message2);
    }

    @Test
    void senderTest() {
        Message message = getMessageRandomSampleGenerator();
        RoomMember roomMemberBack = getRoomMemberRandomSampleGenerator();

        message.setSender(roomMemberBack);
        assertThat(message.getSender()).isEqualTo(roomMemberBack);

        message.sender(null);
        assertThat(message.getSender()).isNull();
    }

    @Test
    void messageTest() {
        Message message = getMessageRandomSampleGenerator();
        Room roomBack = getRoomRandomSampleGenerator();

        message.setMessage(roomBack);
        assertThat(message.getMessage()).isEqualTo(roomBack);

        message.message(null);
        assertThat(message.getMessage()).isNull();
    }
}
