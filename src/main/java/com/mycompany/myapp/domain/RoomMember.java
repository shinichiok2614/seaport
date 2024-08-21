package com.mycompany.myapp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * A RoomMember.
 */
@Entity
@Table(name = "room_member")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RoomMember implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "joined_at", nullable = false)
    private Instant joinedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private User roommember;

    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RoomMember id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public RoomMember name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getJoinedAt() {
        return this.joinedAt;
    }

    public RoomMember joinedAt(Instant joinedAt) {
        this.setJoinedAt(joinedAt);
        return this;
    }

    public void setJoinedAt(Instant joinedAt) {
        this.joinedAt = joinedAt;
    }

    public User getRoommember() {
        return this.roommember;
    }

    public void setRoommember(User user) {
        this.roommember = user;
    }

    public RoomMember roommember(User user) {
        this.setRoommember(user);
        return this;
    }

    public Room getRoom() {
        return this.room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public RoomMember room(Room room) {
        this.setRoom(room);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RoomMember)) {
            return false;
        }
        return getId() != null && getId().equals(((RoomMember) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RoomMember{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", joinedAt='" + getJoinedAt() + "'" +
            "}";
    }
}
