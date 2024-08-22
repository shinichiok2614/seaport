package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.repository.ParagraphRepository;
import com.mycompany.myapp.service.ParagraphService;
import com.mycompany.myapp.service.dto.ParagraphDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Paragraph}.
 */
@RestController
@RequestMapping("/api/paragraphs")
public class ParagraphResource {

    private static final Logger log = LoggerFactory.getLogger(ParagraphResource.class);

    private static final String ENTITY_NAME = "paragraph";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParagraphService paragraphService;

    private final ParagraphRepository paragraphRepository;

    public ParagraphResource(ParagraphService paragraphService, ParagraphRepository paragraphRepository) {
        this.paragraphService = paragraphService;
        this.paragraphRepository = paragraphRepository;
    }

    /**
     * {@code POST  /paragraphs} : Create a new paragraph.
     *
     * @param paragraphDTO the paragraphDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new paragraphDTO, or with status {@code 400 (Bad Request)}
     *         if the paragraph has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ParagraphDTO> createParagraph(@Valid @RequestBody ParagraphDTO paragraphDTO) throws URISyntaxException {
        log.debug("REST request to save Paragraph : {}", paragraphDTO);
        if (paragraphDTO.getId() != null) {
            throw new BadRequestAlertException("A new paragraph cannot already have an ID", ENTITY_NAME, "idexists");
        }
        paragraphDTO = paragraphService.save(paragraphDTO);
        return ResponseEntity.created(new URI("/api/paragraphs/" + paragraphDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, paragraphDTO.getId().toString()))
            .body(paragraphDTO);
    }

    /**
     * {@code PUT  /paragraphs/:id} : Updates an existing paragraph.
     *
     * @param id           the id of the paragraphDTO to save.
     * @param paragraphDTO the paragraphDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated paragraphDTO,
     *         or with status {@code 400 (Bad Request)} if the paragraphDTO is not
     *         valid,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         paragraphDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ParagraphDTO> updateParagraph(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ParagraphDTO paragraphDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Paragraph : {}, {}", id, paragraphDTO);
        if (paragraphDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paragraphDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paragraphRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        paragraphDTO = paragraphService.update(paragraphDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paragraphDTO.getId().toString()))
            .body(paragraphDTO);
    }

    /**
     * {@code PATCH  /paragraphs/:id} : Partial updates given fields of an existing
     * paragraph, field will ignore if it is null
     *
     * @param id           the id of the paragraphDTO to save.
     * @param paragraphDTO the paragraphDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated paragraphDTO,
     *         or with status {@code 400 (Bad Request)} if the paragraphDTO is not
     *         valid,
     *         or with status {@code 404 (Not Found)} if the paragraphDTO is not
     *         found,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         paragraphDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ParagraphDTO> partialUpdateParagraph(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ParagraphDTO paragraphDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Paragraph partially : {}, {}", id, paragraphDTO);
        if (paragraphDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, paragraphDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!paragraphRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ParagraphDTO> result = paragraphService.partialUpdate(paragraphDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paragraphDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /paragraphs} : get all the paragraphs.
     *
     * @param eagerload flag to eager load entities from relationships (This is
     *                  applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of paragraphs in body.
     */
    @GetMapping("")
    public List<ParagraphDTO> getAllParagraphs(
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get all Paragraphs");
        return paragraphService.findAll();
    }

    /**
     * {@code GET  /paragraphs/:id} : get the "id" paragraph.
     *
     * @param id the id of the paragraphDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the paragraphDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ParagraphDTO> getParagraph(@PathVariable("id") Long id) {
        log.debug("REST request to get Paragraph : {}", id);
        Optional<ParagraphDTO> paragraphDTO = paragraphService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paragraphDTO);
    }

    /**
     * {@code DELETE  /paragraphs/:id} : delete the "id" paragraph.
     *
     * @param id the id of the paragraphDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParagraph(@PathVariable("id") Long id) {
        log.debug("REST request to delete Paragraph : {}", id);
        paragraphService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/{id}/by-post")
    public ResponseEntity<List<Paragraph>> getAllParagraphsByPostId(@PathVariable("id") Long id) {
        log.debug("REST request to get Paragraph : {}", id);
        List<Paragraph> paragraphs = paragraphService.findAllByParagraphId(id);
        return ResponseEntity.ok().body(paragraphs);
    }
}
