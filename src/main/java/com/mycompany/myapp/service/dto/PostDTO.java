package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.enumeration.Status;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Post} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PostDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @Lob
    private String summary;

    @Lob
    private byte[] image;

    private String imageContentType;

    @NotNull
    private Status status;

    @NotNull
    private Integer view;

    @Lob
    private String remark;

    @NotNull
    private Instant createdAt;

    @NotNull
    private Instant updateAt;

    private Instant approvedAt;

    private Instant modifiedAt;

    private UserDTO post;

    private CategoryDTO category;
    private PersonDTO person; // Thêm thuộc tính PersonDTO
    private Long userId;
    private Long personId;
    private String personName;

    public PersonDTO getPerson() {
        return person;
    }

    public void setPerson(PersonDTO person) {
        this.person = person;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getView() {
        return view;
    }

    public void setView(Integer view) {
        this.view = view;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Instant updateAt) {
        this.updateAt = updateAt;
    }

    public Instant getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(Instant approvedAt) {
        this.approvedAt = approvedAt;
    }

    public Instant getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Instant modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public UserDTO getPost() {
        return post;
    }

    public void setPost(UserDTO post) {
        this.post = post;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PostDTO)) {
            return false;
        }

        PostDTO postDTO = (PostDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, postDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PostDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", summary='" + getSummary() + "'" +
            ", image='" + getImage() + "'" +
            ", status='" + getStatus() + "'" +
            ", view=" + getView() +
            ", remark='" + getRemark() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updateAt='" + getUpdateAt() + "'" +
            ", approvedAt='" + getApprovedAt() + "'" +
            ", modifiedAt='" + getModifiedAt() + "'" +
            ", post=" + getPost() +
            ", category=" + getCategory() +
            "}";
    }
}
