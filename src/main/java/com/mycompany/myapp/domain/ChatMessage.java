package com.mycompany.myapp.domain;

public class ChatMessage {

    private String type;
    private String room;
    private String text;
    private String username;
    private String timestamp;

    public String getType() {
        return type;
    }

    public String getRoom() {
        return room;
    }

    public String getText() {
        return text;
    }

    public String getUsername() {
        return username;
    }

    public String getTimestamp() {
        return timestamp;
    }

    // Setters
    public void setType(String type) {
        this.type = type;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return (
            "ChatMessage{" +
            "type='" +
            type +
            '\'' +
            ", room='" +
            room +
            '\'' +
            ", text='" +
            text +
            '\'' +
            ", username='" +
            username +
            '\'' +
            ", timestamp='" +
            timestamp +
            '\'' +
            '}'
        );
    }
}
