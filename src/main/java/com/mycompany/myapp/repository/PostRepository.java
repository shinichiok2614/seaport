package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Post;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Post entity.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(
        "select post from Post post where post.post.login = ?#{authentication.name}"
    )
    List<Post> findByPostIsCurrentUser();

    default Optional<Post> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Post> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Post> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    // @Query(value = "select post from Post post left join fetch post.category left
    // join fetch post.post left join fetch post.author.person", countQuery =
    // "select count(post) from Post post")
    @Query(
        value = "select post from Post post left join fetch post.category left join fetch post.post",
        countQuery = "select count(post) from Post post"
    )
    Page<Post> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select post from Post post left join fetch post.category left join fetch post.post"
    )
    List<Post> findAllWithToOneRelationships();

    @Query(
        "select post from Post post left join fetch post.category left join fetch post.post where post.id =:id"
    )
    Optional<Post> findOneWithToOneRelationships(@Param("id") Long id);

    @Query(
        "SELECT p FROM Post p WHERE p.category.id = :categoryId ORDER BY p.createdAt DESC"
    )
    List<Post> findTop10ByCategoryIdOrderByCreatedAtDesc(
        @Param("categoryId") Long categoryId
    );
}
