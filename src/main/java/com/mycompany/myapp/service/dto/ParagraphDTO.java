package com.mycompany.myapp.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Paragraph} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ParagraphDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] image;

    private String imageContentType;

    private String caption;

    @Lob
    private String content;

    private String contentType;

    @NotNull
    private Instant createdAt;

    @NotNull
    private Instant updatedAt;

    private PostDTO paragraph;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public PostDTO getParagraph() {
        return paragraph;
    }

    public void setParagraph(PostDTO paragraph) {
        this.paragraph = paragraph;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParagraphDTO)) {
            return false;
        }

        ParagraphDTO paragraphDTO = (ParagraphDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, paragraphDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ParagraphDTO{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", caption='" + getCaption() + "'" +
            ", content='" + getContent() + "'" +
            ", contentType='" + getContentType() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", paragraph=" + getParagraph() +
            "}";
    }
}
