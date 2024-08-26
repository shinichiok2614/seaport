package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Message;
import com.mycompany.myapp.domain.Person;
import com.mycompany.myapp.domain.RoomMember;
import com.mycompany.myapp.repository.MessageRepository;
import com.mycompany.myapp.repository.PersonRepository;
import com.mycompany.myapp.service.dto.MessageDTO;
import com.mycompany.myapp.service.dto.PersonDTO;
import com.mycompany.myapp.service.mapper.MessageMapper;
import com.mycompany.myapp.service.mapper.PersonMapper;
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
 * {@link com.mycompany.myapp.domain.Message}.
 */
@Service
@Transactional
public class MessageService {

    private static final Logger log = LoggerFactory.getLogger(MessageService.class);

    private final MessageRepository messageRepository;
    private final PersonRepository personRepository;

    private final MessageMapper messageMapper;
    private final PersonMapper personMapper;

    public MessageService(
        MessageRepository messageRepository,
        MessageMapper messageMapper,
        PersonRepository personRepository,
        PersonMapper personMapper
    ) {
        this.messageRepository = messageRepository;
        this.messageMapper = messageMapper;
        this.personRepository = personRepository;
        this.personMapper = personMapper;
    }

    /**
     * Save a message.
     *
     * @param messageDTO the entity to save.
     * @return the persisted entity.
     */
    public MessageDTO save(MessageDTO messageDTO) {
        log.debug("Request to save Message : {}", messageDTO);
        Message message = messageMapper.toEntity(messageDTO);
        message = messageRepository.save(message);
        return messageMapper.toDto(message);
    }

    /**
     * Update a message.
     *
     * @param messageDTO the entity to save.
     * @return the persisted entity.
     */
    public MessageDTO update(MessageDTO messageDTO) {
        log.debug("Request to update Message : {}", messageDTO);
        Message message = messageMapper.toEntity(messageDTO);
        message = messageRepository.save(message);
        return messageMapper.toDto(message);
    }

    /**
     * Partially update a message.
     *
     * @param messageDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<MessageDTO> partialUpdate(MessageDTO messageDTO) {
        log.debug("Request to partially update Message : {}", messageDTO);

        return messageRepository
            .findById(messageDTO.getId())
            .map(existingMessage -> {
                messageMapper.partialUpdate(existingMessage, messageDTO);

                return existingMessage;
            })
            .map(messageRepository::save)
            .map(messageMapper::toDto);
    }

    /**
     * Get all the messages.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<MessageDTO> findAll() {
        log.debug("Request to get all Messages");
        return messageRepository.findAll().stream().map(messageMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the messages with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<MessageDTO> findAllWithEagerRelationships(Pageable pageable) {
        return messageRepository.findAllWithEagerRelationships(pageable).map(messageMapper::toDto);
    }

    /**
     * Get one message by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MessageDTO> findOne(Long id) {
        log.debug("Request to get Message : {}", id);
        return messageRepository.findOneWithEagerRelationships(id).map(messageMapper::toDto);
    }

    /**
     * Delete the message by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Message : {}", id);
        messageRepository.deleteById(id);
    }

    public List<MessageDTO> findAllByMessageId(Long id) {
        // return
        // messageRepository.findAllByMessageId(id).stream().map(messageMapper::toDto).collect(Collectors.toList());
        return messageRepository
            .findAllByMessageId(id)
            .stream()
            .map(message -> {
                MessageDTO messageDTO = messageMapper.toDto(message);

                // Tìm RoomMember tương ứng với Message
                RoomMember sender = message.getSender();
                if (sender != null) {
                    // Tìm Person tương ứng với RoomMember
                    Optional<Person> personOpt = personRepository.findOneByUserId(sender.getRoommember().getId());
                    personOpt.ifPresent(person -> {
                        PersonDTO personDTO = personMapper.toDto(person);
                        // Thêm thông tin Person vào MessageDTO
                        messageDTO.setPerson(personDTO);
                    });
                }

                return messageDTO;
            })
            .collect(Collectors.toList());
    }
}
