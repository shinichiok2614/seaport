package com.mycompany.myapp.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Message} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MessageDTO implements Serializable {

    private Long id;

    @Lob
    private String content;

    @Lob
    private byte[] image;

    private String imageContentType;

    @NotNull
    private Boolean isActive;

    @NotNull
    private Instant createdAt;

    private RoomMemberDTO sender;

    private RoomDTO message;
    private PersonDTO personDTO;

    public PersonDTO getPerson() {
        return personDTO;
    }

    public void setPerson(PersonDTO personDTO) {
        this.personDTO = personDTO;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public RoomMemberDTO getSender() {
        return sender;
    }

    public void setSender(RoomMemberDTO sender) {
        this.sender = sender;
    }

    public RoomDTO getMessage() {
        return message;
    }

    public void setMessage(RoomDTO message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MessageDTO)) {
            return false;
        }

        MessageDTO messageDTO = (MessageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, messageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MessageDTO{" +
                "id=" + getId() +
                ", content='" + getContent() + "'" +
                ", image='" + getImage() + "'" +
                ", isActive='" + getIsActive() + "'" +
                ", createdAt='" + getCreatedAt() + "'" +
                ", sender=" + getSender() +
                ", message=" + getMessage() +
                "}";
    }
}
