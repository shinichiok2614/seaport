package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Follow;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.FollowDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Follow} and its DTO {@link FollowDTO}.
 */
@Mapper(componentModel = "spring")
public interface FollowMapper extends EntityMapper<FollowDTO, Follow> {
    @Mapping(target = "follower", source = "follower", qualifiedByName = "userLogin")
    @Mapping(target = "followee", source = "followee", qualifiedByName = "userLogin")
    FollowDTO toDto(Follow s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
