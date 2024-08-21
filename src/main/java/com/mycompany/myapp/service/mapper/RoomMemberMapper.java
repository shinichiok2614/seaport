package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Person;
import com.mycompany.myapp.domain.Room;
import com.mycompany.myapp.domain.RoomMember;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.PersonDTO;
import com.mycompany.myapp.service.dto.RoomDTO;
import com.mycompany.myapp.service.dto.RoomMemberDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link RoomMember} and its DTO {@link RoomMemberDTO}.
 */
@Mapper(componentModel = "spring")
public interface RoomMemberMapper extends EntityMapper<RoomMemberDTO, RoomMember> {
    @Mapping(target = "roommember", source = "roommember", qualifiedByName = "userLogin")
    @Mapping(target = "room", source = "room", qualifiedByName = "roomName")
    RoomMemberDTO toDto(RoomMember s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("roomName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "isPrivate", source = "isPrivate")
    @Mapping(target = "createdAt", source = "createdAt")
    RoomDTO toDtoRoomName(Room room);

}
