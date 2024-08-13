package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Category;
import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.domain.Person;
import com.mycompany.myapp.domain.Post;
import com.mycompany.myapp.repository.CategoryRepository;
import com.mycompany.myapp.repository.PersonRepository;
import com.mycompany.myapp.repository.PostRepository;
import com.mycompany.myapp.service.dto.CategoryDTO;
import com.mycompany.myapp.service.dto.ParagraphDTO;
import com.mycompany.myapp.service.dto.PersonDTO;
import com.mycompany.myapp.service.dto.PostDTO;
import com.mycompany.myapp.service.mapper.CategoryMapper;
import com.mycompany.myapp.service.mapper.PersonMapper;
import com.mycompany.myapp.service.mapper.PostMapper;
import java.time.Instant;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing
 * {@link com.mycompany.myapp.domain.Category}.
 */
@Service
@Transactional
public class CategoryService {

    private static final Logger log = LoggerFactory.getLogger(
        CategoryService.class
    );

    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;
    private final PersonRepository personRepository;

    private final CategoryMapper categoryMapper;
    private final PostMapper postMapper;
    private final PersonMapper personMapper;

    public CategoryService(
        CategoryRepository categoryRepository,
        CategoryMapper categoryMapper,
        PostRepository postRepository,
        PostMapper postMapper,
        PersonRepository personRepository,
        PersonMapper personMapper
    ) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
        this.postRepository = postRepository;
        this.personRepository = personRepository;
        this.postMapper = postMapper;
        this.personMapper = personMapper;
    }

    /**
     * Save a category.
     *
     * @param categoryDTO the entity to save.
     * @return the persisted entity.
     */
    public CategoryDTO save(CategoryDTO categoryDTO) {
        log.debug("Request to save Category : {}", categoryDTO);
        Category category = categoryMapper.toEntity(categoryDTO);
        category = categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    /**
     * Update a category.
     *
     * @param categoryDTO the entity to save.
     * @return the persisted entity.
     */
    public CategoryDTO update(CategoryDTO categoryDTO) {
        log.debug("Request to update Category : {}", categoryDTO);
        Category category = categoryMapper.toEntity(categoryDTO);
        category = categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    /**
     * Partially update a category.
     *
     * @param categoryDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CategoryDTO> partialUpdate(CategoryDTO categoryDTO) {
        log.debug("Request to partially update Category : {}", categoryDTO);

        return categoryRepository
            .findById(categoryDTO.getId())
            .map(existingCategory -> {
                categoryMapper.partialUpdate(existingCategory, categoryDTO);

                return existingCategory;
            })
            .map(categoryRepository::save)
            .map(categoryMapper::toDto);
    }

    /**
     * Get all the categories.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CategoryDTO> findAll() {
        log.debug("Request to get all Categories");
        return categoryRepository
            .findAll()
            .stream()
            .map(categoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one category by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CategoryDTO> findOne(Long id) {
        log.debug("Request to get Category : {}", id);
        return categoryRepository.findById(id).map(categoryMapper::toDto);
    }

    /**
     * Delete the category by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Category : {}", id);
        categoryRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<CategoryDTO> findAllWithPosts() {
        List<Category> categories = categoryRepository.findAll();

        List<CategoryDTO> categoryDTOList = categories
            .stream()
            .map(category -> {
                CategoryDTO categoryDTO = new CategoryDTO();
                categoryDTO.setId(category.getId());
                categoryDTO.setName(category.getName());

                List<Post> posts =
                    postRepository.findTop10ByCategoryIdOrderByCreatedAtDesc(
                        category.getId()
                    );
                List<PostDTO> postDTOs = posts
                    .stream()
                    .map(post -> {
                        PostDTO postDTO = new PostDTO();
                        postDTO.setId(post.getId());
                        postDTO.setName(post.getName());
                        postDTO.setCreatedAt(post.getCreatedAt());
                        postDTO.setSummary(post.getSummary());
                        postDTO.setImage(post.getImage());
                        postDTO.setImageContentType(post.getImageContentType());
                        postDTO.setCreatedAt(post.getCreatedAt());
                        postDTO.setView(post.getView());

                        Optional<Person> personOpt =
                            personRepository.findOneByUserId(
                                post.getPost().getId()
                            );
                        personOpt.ifPresent(person -> {
                            PersonDTO personDTO = personMapper.toDto(person);
                            postDTO.setPerson(personDTO);
                        });

                        return postDTO;
                    })
                    .collect(Collectors.toList());

                categoryDTO.setPosts(postDTOs);

                return categoryDTO;
            })
            .collect(Collectors.toList());

        return categoryDTOList;
    }
}
