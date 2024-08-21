package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Person;
import com.mycompany.myapp.domain.RoomMember;
import com.mycompany.myapp.repository.PersonRepository;
import com.mycompany.myapp.repository.RoomMemberRepository;
import com.mycompany.myapp.service.dto.PersonDTO;
import com.mycompany.myapp.service.dto.RoomMemberDTO;
import com.mycompany.myapp.service.mapper.PersonMapper;
import com.mycompany.myapp.service.mapper.RoomMemberMapper;
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
 * Service Implementation for managing
 * {@link com.mycompany.myapp.domain.RoomMember}.
 */
@Service
@Transactional
public class RoomMemberService {

    private static final Logger log = LoggerFactory.getLogger(RoomMemberService.class);

    private final RoomMemberRepository roomMemberRepository;
    private final PersonRepository personRepository;

    private final RoomMemberMapper roomMemberMapper;
    private final PersonMapper personMapper;

    public RoomMemberService(RoomMemberRepository roomMemberRepository,
            RoomMemberMapper roomMemberMapper,
            PersonRepository personRepository,
            PersonMapper personMapper) {
        this.roomMemberRepository = roomMemberRepository;
        this.roomMemberMapper = roomMemberMapper;
        this.personRepository = personRepository;
        this.personMapper = personMapper;
    }

    /**
     * Save a roomMember.
     *
     * @param roomMemberDTO the entity to save.
     * @return the persisted entity.
     */
    public RoomMemberDTO save(RoomMemberDTO roomMemberDTO) {
        log.debug("Request to save RoomMember : {}", roomMemberDTO);
        RoomMember roomMember = roomMemberMapper.toEntity(roomMemberDTO);
        roomMember = roomMemberRepository.save(roomMember);
        return roomMemberMapper.toDto(roomMember);
    }

    /**
     * Update a roomMember.
     *
     * @param roomMemberDTO the entity to save.
     * @return the persisted entity.
     */
    public RoomMemberDTO update(RoomMemberDTO roomMemberDTO) {
        log.debug("Request to update RoomMember : {}", roomMemberDTO);
        RoomMember roomMember = roomMemberMapper.toEntity(roomMemberDTO);
        roomMember = roomMemberRepository.save(roomMember);
        return roomMemberMapper.toDto(roomMember);
    }

    /**
     * Partially update a roomMember.
     *
     * @param roomMemberDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<RoomMemberDTO> partialUpdate(RoomMemberDTO roomMemberDTO) {
        log.debug("Request to partially update RoomMember : {}", roomMemberDTO);

        return roomMemberRepository
                .findById(roomMemberDTO.getId())
                .map(existingRoomMember -> {
                    roomMemberMapper.partialUpdate(existingRoomMember, roomMemberDTO);

                    return existingRoomMember;
                })
                .map(roomMemberRepository::save)
                .map(roomMemberMapper::toDto);
    }

    /**
     * Get all the roomMembers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<RoomMemberDTO> findAll() {
        log.debug("Request to get all RoomMembers");
        return roomMemberRepository.findAll().stream().map(roomMemberMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the roomMembers with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<RoomMemberDTO> findAllWithEagerRelationships(Pageable pageable) {
        return roomMemberRepository.findAllWithEagerRelationships(pageable).map(roomMemberMapper::toDto);
    }

    /**
     * Get one roomMember by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<RoomMemberDTO> findOne(Long id) {
        log.debug("Request to get RoomMember : {}", id);
        return roomMemberRepository.findOneWithEagerRelationships(id).map(roomMemberMapper::toDto);
    }

    /**
     * Delete the roomMember by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete RoomMember : {}", id);
        roomMemberRepository.deleteById(id);
    }

    public List<RoomMemberDTO> findByRoommemberIsCurrentUserWithRoom() {
        // return roomMemberRepository.findByRoommemberIsCurrentUserWithRoom().stream()
        // .map(roomMemberMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
        List<RoomMember> rooms = roomMemberRepository.findByRoommemberIsCurrentUserWithRoom();
        List<RoomMemberDTO> roomMemberDTOs = rooms.stream().map(room -> {
            RoomMemberDTO dto = roomMemberMapper.toDto(room);
            Optional<Person> personOpt = personRepository.findOneByUserId(
                    room.getRoommember().getId());
            personOpt.ifPresent(person -> {
                PersonDTO personDTO = personMapper.toDto(person);
                dto.setPersonDTO(personDTO);
            });
            return dto;
        }).collect(Collectors.toList());
        return roomMemberDTOs;
    }
}
