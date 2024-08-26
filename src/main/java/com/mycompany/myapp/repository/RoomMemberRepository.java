package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RoomMember;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the RoomMember entity.
 */
@Repository
public interface RoomMemberRepository extends JpaRepository<RoomMember, Long> {
    @Query("select roomMember from RoomMember roomMember where roomMember.roommember.login = ?#{authentication.name}")
    List<RoomMember> findByRoommemberIsCurrentUser();

    default Optional<RoomMember> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<RoomMember> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<RoomMember> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select roomMember from RoomMember roomMember left join fetch roomMember.roommember left join fetch roomMember.room",
        countQuery = "select count(roomMember) from RoomMember roomMember"
    )
    Page<RoomMember> findAllWithToOneRelationships(Pageable pageable);

    @Query("select roomMember from RoomMember roomMember left join fetch roomMember.roommember left join fetch roomMember.room")
    List<RoomMember> findAllWithToOneRelationships();

    @Query(
        "select roomMember from RoomMember roomMember left join fetch roomMember.roommember left join fetch roomMember.room where roomMember.id =:id"
    )
    Optional<RoomMember> findOneWithToOneRelationships(@Param("id") Long id);

    @Query(
        "select roomMember from RoomMember roomMember left join fetch roomMember.room where roomMember.roommember.login = ?#{authentication.name}"
    )
    // @Query("select roomMember from RoomMember roomMember left join fetch roomMember.room r left join fetch roomMember.roommember u left join fetch u.person p where u.login = ?#{authentication.name}")
    List<RoomMember> findByRoommemberIsCurrentUserWithRoom();

    List<RoomMember> findAllByRoomId(Long roomId);
}
