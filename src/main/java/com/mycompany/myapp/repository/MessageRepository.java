package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Message;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Message entity.
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query(
        "select message from Message message where message.sender.login = ?#{authentication.name}"
    )
    List<Message> findBySenderIsCurrentUser();

    @Query(
        "select message from Message message where message.receiver.login = ?#{authentication.name}"
    )
    List<Message> findByReceiverIsCurrentUser();

    default Optional<Message> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Message> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Message> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select message from Message message left join fetch message.sender left join fetch message.receiver",
        countQuery = "select count(message) from Message message"
    )
    Page<Message> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select message from Message message left join fetch message.sender left join fetch message.receiver"
    )
    List<Message> findAllWithToOneRelationships();

    @Query(
        "select message from Message message left join fetch message.sender left join fetch message.receiver where message.id =:id"
    )
    Optional<Message> findOneWithToOneRelationships(@Param("id") Long id);

    // List<Message> findAllBySenderOrReceiver(Long senderId, Long receiverId);

    @Query(
        "select message from Message message where message.sender.login = ?#{authentication.name} or message.receiver.login = ?#{authentication.name}"
    )
    List<Message> findBySenderOrReceiverIsCurrentUser();
}
