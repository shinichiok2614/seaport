package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.repository.ParagraphRepository;
import com.mycompany.myapp.service.dto.ParagraphDTO;
import com.mycompany.myapp.service.mapper.ParagraphMapper;
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
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Paragraph}.
 */
@Service
@Transactional
public class ParagraphService {

    private static final Logger log = LoggerFactory.getLogger(
        ParagraphService.class
    );

    private final ParagraphRepository paragraphRepository;

    private final ParagraphMapper paragraphMapper;

    public ParagraphService(
        ParagraphRepository paragraphRepository,
        ParagraphMapper paragraphMapper
    ) {
        this.paragraphRepository = paragraphRepository;
        this.paragraphMapper = paragraphMapper;
    }

    /**
     * Save a paragraph.
     *
     * @param paragraphDTO the entity to save.
     * @return the persisted entity.
     */
    public ParagraphDTO save(ParagraphDTO paragraphDTO) {
        log.debug("Request to save Paragraph : {}", paragraphDTO);
        Paragraph paragraph = paragraphMapper.toEntity(paragraphDTO);
        paragraph = paragraphRepository.save(paragraph);
        return paragraphMapper.toDto(paragraph);
    }

    /**
     * Update a paragraph.
     *
     * @param paragraphDTO the entity to save.
     * @return the persisted entity.
     */
    public ParagraphDTO update(ParagraphDTO paragraphDTO) {
        log.debug("Request to update Paragraph : {}", paragraphDTO);
        Paragraph paragraph = paragraphMapper.toEntity(paragraphDTO);
        paragraph = paragraphRepository.save(paragraph);
        return paragraphMapper.toDto(paragraph);
    }

    /**
     * Partially update a paragraph.
     *
     * @param paragraphDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ParagraphDTO> partialUpdate(ParagraphDTO paragraphDTO) {
        log.debug("Request to partially update Paragraph : {}", paragraphDTO);

        return paragraphRepository
            .findById(paragraphDTO.getId())
            .map(existingParagraph -> {
                paragraphMapper.partialUpdate(existingParagraph, paragraphDTO);

                return existingParagraph;
            })
            .map(paragraphRepository::save)
            .map(paragraphMapper::toDto);
    }

    /**
     * Get all the paragraphs.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ParagraphDTO> findAll() {
        log.debug("Request to get all Paragraphs");
        return paragraphRepository
            .findAll()
            .stream()
            .map(paragraphMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the paragraphs with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ParagraphDTO> findAllWithEagerRelationships(Pageable pageable) {
        return paragraphRepository
            .findAllWithEagerRelationships(pageable)
            .map(paragraphMapper::toDto);
    }

    /**
     * Get one paragraph by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ParagraphDTO> findOne(Long id) {
        log.debug("Request to get Paragraph : {}", id);
        return paragraphRepository
            .findOneWithEagerRelationships(id)
            .map(paragraphMapper::toDto);
    }

    /**
     * Delete the paragraph by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Paragraph : {}", id);
        paragraphRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Paragraph> findAllByParagraphId(Long postId) {
        return paragraphRepository.findAllByParagraphId(postId);
    }
}
