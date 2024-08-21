package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.RoomMemberAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.RoomMember;
import com.mycompany.myapp.repository.RoomMemberRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.RoomMemberService;
import com.mycompany.myapp.service.dto.RoomMemberDTO;
import com.mycompany.myapp.service.mapper.RoomMemberMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
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
 * Integration tests for the {@link RoomMemberResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class RoomMemberResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_JOINED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_JOINED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/room-members";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private RoomMemberRepository roomMemberRepository;

    @Autowired
    private UserRepository userRepository;

    @Mock
    private RoomMemberRepository roomMemberRepositoryMock;

    @Autowired
    private RoomMemberMapper roomMemberMapper;

    @Mock
    private RoomMemberService roomMemberServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRoomMemberMockMvc;

    private RoomMember roomMember;

    private RoomMember insertedRoomMember;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RoomMember createEntity(EntityManager em) {
        RoomMember roomMember = new RoomMember().name(DEFAULT_NAME).joinedAt(DEFAULT_JOINED_AT);
        return roomMember;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RoomMember createUpdatedEntity(EntityManager em) {
        RoomMember roomMember = new RoomMember().name(UPDATED_NAME).joinedAt(UPDATED_JOINED_AT);
        return roomMember;
    }

    @BeforeEach
    public void initTest() {
        roomMember = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedRoomMember != null) {
            roomMemberRepository.delete(insertedRoomMember);
            insertedRoomMember = null;
        }
    }

    @Test
    @Transactional
    void createRoomMember() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the RoomMember
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(roomMember);
        var returnedRoomMemberDTO = om.readValue(
            restRoomMemberMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(roomMemberDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            RoomMemberDTO.class
        );

        // Validate the RoomMember in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedRoomMember = roomMemberMapper.toEntity(returnedRoomMemberDTO);
        assertRoomMemberUpdatableFieldsEquals(returnedRoomMember, getPersistedRoomMember(returnedRoomMember));

        insertedRoomMember = returnedRoomMember;
    }

    @Test
    @Transactional
    void createRoomMemberWithExistingId() throws Exception {
        // Create the RoomMember with an existing ID
        roomMember.setId(1L);
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(roomMember);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoomMemberMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(roomMemberDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RoomMember in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkJoinedAtIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        roomMember.setJoinedAt(null);

        // Create the RoomMember, which fails.
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(roomMember);

        restRoomMemberMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(roomMemberDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllRoomMembers() throws Exception {
        // Initialize the database
        insertedRoomMember = roomMemberRepository.saveAndFlush(roomMember);

        // Get all the roomMemberList
        restRoomMemberMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roomMember.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].joinedAt").value(hasItem(DEFAULT_JOINED_AT.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllRoomMembersWithEagerRelationshipsIsEnabled() throws Exception {
        when(roomMemberServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restRoomMemberMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(roomMemberServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllRoomMembersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(roomMemberServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restRoomMemberMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(roomMemberRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getRoomMember() throws Exception {
        // Initialize the database
        insertedRoomMember = roomMemberRepository.saveAndFlush(roomMember);

        // Get the roomMember
        restRoomMemberMockMvc
            .perform(get(ENTITY_API_URL_ID, roomMember.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(roomMember.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.joinedAt").value(DEFAULT_JOINED_AT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingRoomMember() throws Exception {
        // Get the roomMember
        restRoomMemberMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRoomMember() throws Exception {
        // Initialize the database
        insertedRoomMember = roomMemberRepository.saveAndFlush(roomMember);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the roomMember
        RoomMember updatedRoomMember = roomMemberRepository.findById(roomMember.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedRoomMember are not directly saved in db
        em.detach(updatedRoomMember);
        updatedRoomMember.name(UPDATED_NAME).joinedAt(UPDATED_JOINED_AT);
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(updatedRoomMember);

        restRoomMemberMockMvc
            .perform(
                put(ENTITY_API_URL_ID, roomMemberDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(roomMemberDTO))
            )
            .andExpect(status().isOk());

        // Validate the RoomMember in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedRoomMemberToMatchAllProperties(updatedRoomMember);
    }

    @Test
    @Transactional
    void putNonExistingRoomMember() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        roomMember.setId(longCount.incrementAndGet());

        // Create the RoomMember
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(roomMember);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoomMemberMockMvc
            .perform(
                put(ENTITY_API_URL_ID, roomMemberDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(roomMemberDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RoomMember in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRoomMember() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        roomMember.setId(longCount.incrementAndGet());

        // Create the RoomMember
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(roomMember);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoomMemberMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(roomMemberDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RoomMember in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRoomMember() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        roomMember.setId(longCount.incrementAndGet());

        // Create the RoomMember
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(roomMember);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoomMemberMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(roomMemberDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the RoomMember in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRoomMemberWithPatch() throws Exception {
        // Initialize the database
        insertedRoomMember = roomMemberRepository.saveAndFlush(roomMember);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the roomMember using partial update
        RoomMember partialUpdatedRoomMember = new RoomMember();
        partialUpdatedRoomMember.setId(roomMember.getId());

        restRoomMemberMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRoomMember.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedRoomMember))
            )
            .andExpect(status().isOk());

        // Validate the RoomMember in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertRoomMemberUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedRoomMember, roomMember),
            getPersistedRoomMember(roomMember)
        );
    }

    @Test
    @Transactional
    void fullUpdateRoomMemberWithPatch() throws Exception {
        // Initialize the database
        insertedRoomMember = roomMemberRepository.saveAndFlush(roomMember);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the roomMember using partial update
        RoomMember partialUpdatedRoomMember = new RoomMember();
        partialUpdatedRoomMember.setId(roomMember.getId());

        partialUpdatedRoomMember.name(UPDATED_NAME).joinedAt(UPDATED_JOINED_AT);

        restRoomMemberMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRoomMember.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedRoomMember))
            )
            .andExpect(status().isOk());

        // Validate the RoomMember in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertRoomMemberUpdatableFieldsEquals(partialUpdatedRoomMember, getPersistedRoomMember(partialUpdatedRoomMember));
    }

    @Test
    @Transactional
    void patchNonExistingRoomMember() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        roomMember.setId(longCount.incrementAndGet());

        // Create the RoomMember
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(roomMember);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoomMemberMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, roomMemberDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(roomMemberDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RoomMember in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRoomMember() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        roomMember.setId(longCount.incrementAndGet());

        // Create the RoomMember
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(roomMember);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoomMemberMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(roomMemberDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the RoomMember in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRoomMember() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        roomMember.setId(longCount.incrementAndGet());

        // Create the RoomMember
        RoomMemberDTO roomMemberDTO = roomMemberMapper.toDto(roomMember);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRoomMemberMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(roomMemberDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the RoomMember in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRoomMember() throws Exception {
        // Initialize the database
        insertedRoomMember = roomMemberRepository.saveAndFlush(roomMember);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the roomMember
        restRoomMemberMockMvc
            .perform(delete(ENTITY_API_URL_ID, roomMember.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return roomMemberRepository.count();
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

    protected RoomMember getPersistedRoomMember(RoomMember roomMember) {
        return roomMemberRepository.findById(roomMember.getId()).orElseThrow();
    }

    protected void assertPersistedRoomMemberToMatchAllProperties(RoomMember expectedRoomMember) {
        assertRoomMemberAllPropertiesEquals(expectedRoomMember, getPersistedRoomMember(expectedRoomMember));
    }

    protected void assertPersistedRoomMemberToMatchUpdatableProperties(RoomMember expectedRoomMember) {
        assertRoomMemberAllUpdatablePropertiesEquals(expectedRoomMember, getPersistedRoomMember(expectedRoomMember));
    }
}
