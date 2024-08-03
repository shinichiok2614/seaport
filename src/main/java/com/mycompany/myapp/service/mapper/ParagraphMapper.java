package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Paragraph;
import com.mycompany.myapp.domain.Post;
import com.mycompany.myapp.service.dto.ParagraphDTO;
import com.mycompany.myapp.service.dto.PostDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Paragraph} and its DTO {@link ParagraphDTO}.
 */
@Mapper(componentModel = "spring")
public interface ParagraphMapper extends EntityMapper<ParagraphDTO, Paragraph> {
    @Mapping(target = "paragraph", source = "paragraph", qualifiedByName = "postName")
    ParagraphDTO toDto(Paragraph s);

    @Named("postName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    PostDTO toDtoPostName(Post post);
}
