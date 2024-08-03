package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.ParagraphAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.repository.ParagraphRepository;
import com.mycompany.myapp.service.ParagraphService;
import com.mycompany.myapp.service.dto.ParagraphDTO;
import com.mycompany.myapp.service.mapper.ParagraphMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ParagraphResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ParagraphResourceIT {

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CAPTION = "AAAAAAAAAA";
    private static final String UPDATED_CAPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_TYPE = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/paragraphs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ParagraphRepository paragraphRepository;

    @Mock
    private ParagraphRepository paragraphRepositoryMock;

    @Autowired
    private ParagraphMapper paragraphMapper;

    @Mock
    private ParagraphService paragraphServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restParagraphMockMvc;

    private Paragraph paragraph;

    private Paragraph insertedParagraph;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paragraph createEntity(EntityManager em) {
        Paragraph paragraph = new Paragraph()
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .caption(DEFAULT_CAPTION)
            .content(DEFAULT_CONTENT)
            .contentType(DEFAULT_CONTENT_TYPE)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return paragraph;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paragraph createUpdatedEntity(EntityManager em) {
        Paragraph paragraph = new Paragraph()
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .caption(UPDATED_CAPTION)
            .content(UPDATED_CONTENT)
            .contentType(UPDATED_CONTENT_TYPE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return paragraph;
    }

    @BeforeEach
    public void initTest() {
        paragraph = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedParagraph != null) {
            paragraphRepository.delete(insertedParagraph);
            insertedParagraph = null;
        }
    }

    @Test
    @Transactional
    void createParagraph() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Paragraph
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);
        var returnedParagraphDTO = om.readValue(
            restParagraphMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(paragraphDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ParagraphDTO.class
        );

        // Validate the Paragraph in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedParagraph = paragraphMapper.toEntity(returnedParagraphDTO);
        assertParagraphUpdatableFieldsEquals(returnedParagraph, getPersistedParagraph(returnedParagraph));

        insertedParagraph = returnedParagraph;
    }

    @Test
    @Transactional
    void createParagraphWithExistingId() throws Exception {
        // Create the Paragraph with an existing ID
        paragraph.setId(1L);
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restParagraphMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(paragraphDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Paragraph in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCreatedAtIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        paragraph.setCreatedAt(null);

        // Create the Paragraph, which fails.
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);

        restParagraphMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(paragraphDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkUpdatedAtIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        paragraph.setUpdatedAt(null);

        // Create the Paragraph, which fails.
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);

        restParagraphMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(paragraphDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllParagraphs() throws Exception {
        // Initialize the database
        insertedParagraph = paragraphRepository.saveAndFlush(paragraph);

        // Get all the paragraphList
        restParagraphMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paragraph.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64.getEncoder().encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].caption").value(hasItem(DEFAULT_CAPTION)))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].contentType").value(hasItem(DEFAULT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllParagraphsWithEagerRelationshipsIsEnabled() throws Exception {
        when(paragraphServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restParagraphMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(paragraphServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllParagraphsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(paragraphServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restParagraphMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(paragraphRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getParagraph() throws Exception {
        // Initialize the database
        insertedParagraph = paragraphRepository.saveAndFlush(paragraph);

        // Get the paragraph
        restParagraphMockMvc
            .perform(get(ENTITY_API_URL_ID, paragraph.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paragraph.getId().intValue()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64.getEncoder().encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.caption").value(DEFAULT_CAPTION))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.contentType").value(DEFAULT_CONTENT_TYPE))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingParagraph() throws Exception {
        // Get the paragraph
        restParagraphMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingParagraph() throws Exception {
        // Initialize the database
        insertedParagraph = paragraphRepository.saveAndFlush(paragraph);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the paragraph
        Paragraph updatedParagraph = paragraphRepository.findById(paragraph.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedParagraph are not directly saved in db
        em.detach(updatedParagraph);
        updatedParagraph
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .caption(UPDATED_CAPTION)
            .content(UPDATED_CONTENT)
            .contentType(UPDATED_CONTENT_TYPE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(updatedParagraph);

        restParagraphMockMvc
            .perform(
                put(ENTITY_API_URL_ID, paragraphDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(paragraphDTO))
            )
            .andExpect(status().isOk());

        // Validate the Paragraph in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedParagraphToMatchAllProperties(updatedParagraph);
    }

    @Test
    @Transactional
    void putNonExistingParagraph() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        paragraph.setId(longCount.incrementAndGet());

        // Create the Paragraph
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParagraphMockMvc
            .perform(
                put(ENTITY_API_URL_ID, paragraphDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(paragraphDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Paragraph in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchParagraph() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        paragraph.setId(longCount.incrementAndGet());

        // Create the Paragraph
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParagraphMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(paragraphDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Paragraph in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamParagraph() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        paragraph.setId(longCount.incrementAndGet());

        // Create the Paragraph
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParagraphMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(paragraphDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Paragraph in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateParagraphWithPatch() throws Exception {
        // Initialize the database
        insertedParagraph = paragraphRepository.saveAndFlush(paragraph);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the paragraph using partial update
        Paragraph partialUpdatedParagraph = new Paragraph();
        partialUpdatedParagraph.setId(paragraph.getId());

        partialUpdatedParagraph.caption(UPDATED_CAPTION);

        restParagraphMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParagraph.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedParagraph))
            )
            .andExpect(status().isOk());

        // Validate the Paragraph in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertParagraphUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedParagraph, paragraph),
            getPersistedParagraph(paragraph)
        );
    }

    @Test
    @Transactional
    void fullUpdateParagraphWithPatch() throws Exception {
        // Initialize the database
        insertedParagraph = paragraphRepository.saveAndFlush(paragraph);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the paragraph using partial update
        Paragraph partialUpdatedParagraph = new Paragraph();
        partialUpdatedParagraph.setId(paragraph.getId());

        partialUpdatedParagraph
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .caption(UPDATED_CAPTION)
            .content(UPDATED_CONTENT)
            .contentType(UPDATED_CONTENT_TYPE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restParagraphMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParagraph.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedParagraph))
            )
            .andExpect(status().isOk());

        // Validate the Paragraph in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertParagraphUpdatableFieldsEquals(partialUpdatedParagraph, getPersistedParagraph(partialUpdatedParagraph));
    }

    @Test
    @Transactional
    void patchNonExistingParagraph() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        paragraph.setId(longCount.incrementAndGet());

        // Create the Paragraph
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParagraphMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, paragraphDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(paragraphDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Paragraph in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchParagraph() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        paragraph.setId(longCount.incrementAndGet());

        // Create the Paragraph
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParagraphMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(paragraphDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Paragraph in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamParagraph() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        paragraph.setId(longCount.incrementAndGet());

        // Create the Paragraph
        ParagraphDTO paragraphDTO = paragraphMapper.toDto(paragraph);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParagraphMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(paragraphDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Paragraph in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteParagraph() throws Exception {
        // Initialize the database
        insertedParagraph = paragraphRepository.saveAndFlush(paragraph);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the paragraph
        restParagraphMockMvc
            .perform(delete(ENTITY_API_URL_ID, paragraph.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return paragraphRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Paragraph getPersistedParagraph(Paragraph paragraph) {
        return paragraphRepository.findById(paragraph.getId()).orElseThrow();
    }

    protected void assertPersistedParagraphToMatchAllProperties(Paragraph expectedParagraph) {
        assertParagraphAllPropertiesEquals(expectedParagraph, getPersistedParagraph(expectedParagraph));
    }

    protected void assertPersistedParagraphToMatchUpdatableProperties(Paragraph expectedParagraph) {
        assertParagraphAllUpdatablePropertiesEquals(expectedParagraph, getPersistedParagraph(expectedParagraph));
    }
}
