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
        value = "select message from Message message left join fetch message.sender left join fetch message.message",
        countQuery = "select count(message) from Message message"
    )
    Page<Message> findAllWithToOneRelationships(Pageable pageable);

    @Query("select message from Message message left join fetch message.sender left join fetch message.message")
    List<Message> findAllWithToOneRelationships();

    @Query("select message from Message message left join fetch message.sender left join fetch message.message where message.id =:id")
    Optional<Message> findOneWithToOneRelationships(@Param("id") Long id);

    // @Query("select message from Message message left join fetch message.sender
    // left join fetch message.message where message.message.id =:id")
    // @Query(
    // value = "SELECT * FROM message m WHERE m.message_id =:id",
    // nativeQuery = true
    // )
    // List<Message> findAllByMessageId(@Param("id") Long id);
    @Query(
        "select message from Message message left join fetch message.sender left join fetch message.message where message.message.id=:id"
    )
    // @Query("select message from Message message left join fetch message.sender
    // left join fetch sender.person person left join fetch message.message where
    // message.message.id =:id")
    List<Message> findAllByMessageId(@Param("id") Long id);
}
