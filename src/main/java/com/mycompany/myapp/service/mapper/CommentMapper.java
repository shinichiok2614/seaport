package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Comment;
import com.mycompany.myapp.domain.Post;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.CommentDTO;
import com.mycompany.myapp.service.dto.PostDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Comment} and its DTO {@link CommentDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {
    @Mapping(target = "comment", source = "comment", qualifiedByName = "userLogin")
    @Mapping(target = "post", source = "post", qualifiedByName = "postName")
    CommentDTO toDto(Comment s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("postName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    PostDTO toDtoPostName(Post post);
}
