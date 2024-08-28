package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Person;
import com.mycompany.myapp.domain.Post;
import com.mycompany.myapp.repository.PersonRepository;
import com.mycompany.myapp.repository.PostRepository;
import com.mycompany.myapp.service.dto.CategoryDTO;
import com.mycompany.myapp.service.dto.PersonDTO;
import com.mycompany.myapp.service.dto.PostDTO;
import com.mycompany.myapp.service.mapper.PersonMapper;
import com.mycompany.myapp.service.mapper.PostMapper;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Post}.
 */
@Service
@Transactional
public class PostService {

    private static final Logger log = LoggerFactory.getLogger(PostService.class);

    private final PostRepository postRepository;

    private final PostMapper postMapper;
    private final PersonRepository personRepository;
    private final PersonMapper personMapper;

    public PostService(PostRepository postRepository, PostMapper postMapper, PersonRepository personRepository, PersonMapper personMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.personRepository = personRepository;
        this.personMapper = personMapper;
    }

    /**
     * Save a post.
     *
     * @param postDTO the entity to save.
     * @return the persisted entity.
     */
    public PostDTO save(PostDTO postDTO) {
        log.debug("Request to save Post : {}", postDTO);
        Post post = postMapper.toEntity(postDTO);
        post = postRepository.save(post);
        return postMapper.toDto(post);
    }

    /**
     * Update a post.
     *
     * @param postDTO the entity to save.
     * @return the persisted entity.
     */
    public PostDTO update(PostDTO postDTO) {
        log.debug("Request to update Post : {}", postDTO);
        Post post = postMapper.toEntity(postDTO);
        post = postRepository.save(post);
        return postMapper.toDto(post);
    }

    /**
     * Partially update a post.
     *
     * @param postDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PostDTO> partialUpdate(PostDTO postDTO) {
        log.debug("Request to partially update Post : {}", postDTO);

        return postRepository
            .findById(postDTO.getId())
            .map(existingPost -> {
                postMapper.partialUpdate(existingPost, postDTO);

                return existingPost;
            })
            .map(postRepository::save)
            .map(postMapper::toDto);
    }

    /**
     * Get all the posts.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PostDTO> findAll() {
        log.debug("Request to get all Posts");
        // return postRepository.findAll().stream().map(postMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
        return postRepository
            .findAll()
            .stream()
            .map(post -> {
                PostDTO postDTO = new PostDTO();
                postDTO.setId(post.getId());
                postDTO.setName(post.getName());
                postDTO.setCreatedAt(post.getCreatedAt());
                postDTO.setSummary(post.getSummary());
                postDTO.setImage(post.getImage());
                postDTO.setImageContentType(post.getImageContentType());
                postDTO.setStatus(post.getStatus());
                postDTO.setView(post.getView());
                postDTO.setRemark(post.getRemark());
                postDTO.setUpdateAt(post.getUpdateAt());
                postDTO.setApprovedAt(post.getApprovedAt());
                postDTO.setModifiedAt(post.getModifiedAt());

                Optional<Person> personOpt = personRepository.findOneByUserId( // userid->personid
                    post.getPost().getId()
                );
                personOpt.ifPresent(person -> {
                    PersonDTO personDTO = personMapper.toDto(person); // lấy kq user và tìm person tương ứng
                    postDTO.setPerson(personDTO);
                });
                if (post.getCategory() != null) {
                    CategoryDTO categoryDTO = new CategoryDTO();
                    categoryDTO.setId(post.getCategory().getId());
                    categoryDTO.setName(post.getCategory().getName());
                    postDTO.setCategory(categoryDTO);
                }
                return postDTO;
            })
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the posts with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<PostDTO> findAllWithEagerRelationships(Pageable pageable) {
        return postRepository.findAllWithEagerRelationships(pageable).map(postMapper::toDto);
    }

    /**
     * Get one post by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PostDTO> findOne(Long id) {
        log.debug("Request to get Post : {}", id);
        return postRepository.findOneWithEagerRelationships(id).map(postMapper::toDto);
    }

    /**
     * Delete the post by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Post : {}", id);
        postRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Optional<PostDTO> findOneWithPerson(Long id) {
        return postRepository
            .findById(id)
            .map(post -> {
                PostDTO postDTO = new PostDTO();
                postDTO.setId(post.getId());
                postDTO.setName(post.getName());
                postDTO.setCreatedAt(post.getCreatedAt());
                postDTO.setSummary(post.getSummary());
                postDTO.setImage(post.getImage());
                postDTO.setImageContentType(post.getImageContentType());
                postDTO.setStatus(post.getStatus());
                postDTO.setView(post.getView());
                postDTO.setRemark(post.getRemark());
                postDTO.setUpdateAt(post.getUpdateAt());
                postDTO.setApprovedAt(post.getApprovedAt());
                postDTO.setModifiedAt(post.getModifiedAt());

                Optional<Person> personOpt = personRepository.findOneByUserId( // userid->personid
                    post.getPost().getId()
                );
                personOpt.ifPresent(person -> {
                    PersonDTO personDTO = personMapper.toDto(person); // lấy kq user và tìm person tương ứng
                    postDTO.setPerson(personDTO);
                });
                if (post.getCategory() != null) {
                    CategoryDTO categoryDTO = new CategoryDTO();
                    categoryDTO.setId(post.getCategory().getId());
                    categoryDTO.setName(post.getCategory().getName());
                    postDTO.setCategory(categoryDTO);
                }
                return postDTO;
            });
    }

    // @Transactional(readOnly = true)
    // public List<PostDTO> findAllByPersonId(Long personId) { //có person id và tìm
    // user id tương ứng
    // Optional<PersonDTO> persondto=
    // personRepository.findOneWithEagerRelationships(
    // personId).map(personMapper::toDto);
    // return postRepository.findAllByPost(
    // persondto.getUser().getId())
    // .stream()
    // .map(postMapper::toDto)
    // .collect(Collectors.toList());
    // }
    @Transactional(readOnly = true)
    public List<PostDTO> findAllByPersonId(Long personId) { // personid->userid
        // Lấy Optional của PersonDTO từ personRepository
        Optional<PersonDTO> persondtoOptional = personRepository.findOneWithEagerRelationships(personId).map(personMapper::toDto);

        // Kiểm tra nếu persondtoOptional có giá trị
        if (persondtoOptional.isPresent()) {
            PersonDTO persondto = persondtoOptional.get();
            Long userId = persondto.getUser().getId();

            // Tìm tất cả các Post liên quan đến userId và chuyển đổi chúng sang DTO
            return postRepository.findAllByUserId(userId).stream().map(postMapper::toDto).collect(Collectors.toList());
        } else {
            // Trường hợp không tìm thấy Person, có thể trả về danh sách trống hoặc xử lý
            // khác
            return Collections.emptyList();
        }
    }

    @Transactional(readOnly = true)
    public List<PostDTO> getAllPostsFromFollowedUsers() {
        return postRepository.findAllPostsFromFollowedUsers().stream().map(postMapper::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostDTO> findByPostIsCurrentUser() {
        return postRepository.findByPostIsCurrentUser().stream().map(postMapper::toDto).collect(Collectors.toList());
    }
}
