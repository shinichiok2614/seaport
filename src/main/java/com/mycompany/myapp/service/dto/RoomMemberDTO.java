package com.mycompany.myapp.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.RoomMember} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RoomMemberDTO implements Serializable {

    private Long id;

    private String name;

    @NotNull
    private Instant joinedAt;

    private UserDTO roommember;

    private RoomDTO room;
    private PersonDTO personDTO;

    public PersonDTO getPersonDTO() {
        return personDTO;
    }

    public void setPersonDTO(PersonDTO personDTO) {
        this.personDTO = personDTO;
    }
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Instant joinedAt) {
        this.joinedAt = joinedAt;
    }

    public UserDTO getRoommember() {
        return roommember;
    }

    public void setRoommember(UserDTO roommember) {
        this.roommember = roommember;
    }

    public RoomDTO getRoom() {
        return room;
    }

    public void setRoom(RoomDTO room) {
        this.room = room;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RoomMemberDTO)) {
            return false;
        }

        RoomMemberDTO roomMemberDTO = (RoomMemberDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, roomMemberDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RoomMemberDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", joinedAt='" + getJoinedAt() + "'" +
            ", roommember=" + getRoommember() +
            ", room=" + getRoom() +
            "}";
    }
}
