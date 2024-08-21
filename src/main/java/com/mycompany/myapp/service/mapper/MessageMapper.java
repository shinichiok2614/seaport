package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Message;
import com.mycompany.myapp.domain.Room;
import com.mycompany.myapp.domain.RoomMember;
import com.mycompany.myapp.service.dto.MessageDTO;
import com.mycompany.myapp.service.dto.RoomDTO;
import com.mycompany.myapp.service.dto.RoomMemberDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Message} and its DTO {@link MessageDTO}.
 */
@Mapper(componentModel = "spring")
public interface MessageMapper extends EntityMapper<MessageDTO, Message> {
    @Mapping(target = "sender", source = "sender", qualifiedByName = "roomMemberName")
    @Mapping(target = "message", source = "message", qualifiedByName = "roomName")
    MessageDTO toDto(Message s);

    @Named("roomMemberName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    RoomMemberDTO toDtoRoomMemberName(RoomMember roomMember);

    @Named("roomName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    RoomDTO toDtoRoomName(Room room);
}
