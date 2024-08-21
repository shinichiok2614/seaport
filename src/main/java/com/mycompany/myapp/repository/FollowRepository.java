package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Follow;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Follow entity.
 */
@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Query("select follow from Follow follow where follow.follower.login = ?#{authentication.name}")
    List<Follow> findByFollowerIsCurrentUser();

    @Query("select follow from Follow follow where follow.followee.login = ?#{authentication.name}")
    List<Follow> findByFolloweeIsCurrentUser();

    default Optional<Follow> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Follow> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Follow> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select follow from Follow follow left join fetch follow.follower left join fetch follow.followee",
        countQuery = "select count(follow) from Follow follow"
    )
    Page<Follow> findAllWithToOneRelationships(Pageable pageable);

    @Query("select follow from Follow follow left join fetch follow.follower left join fetch follow.followee")
    List<Follow> findAllWithToOneRelationships();

    @Query("select follow from Follow follow left join fetch follow.follower left join fetch follow.followee where follow.id =:id")
    Optional<Follow> findOneWithToOneRelationships(@Param("id") Long id);
}
