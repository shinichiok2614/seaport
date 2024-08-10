import React from 'react';
import { TextFormat } from 'react-jhipster';
import './PersonDisplay.css'; // Thêm file CSS để tạo kiểu
import ProfileMeta from '../person-view-profile-meta/profile-meta';
import PostListViewProfile from '../post-list-view-person/post-list-view-person';

const PersonDisplay = ({ personEntity, users, departments, postList }) => {
  if (!personEntity) {
    return <p>Loading...</p>;
  }

  const user = users.find(u => u.id === personEntity.user) || {};
  const department =
    departments.find(d => d.id === personEntity.department) || {};

  return (
    <div className="person-display">
      <div className="cover-photo">
        {personEntity.cover ? (
          <img
            src={personEntity.cover}
            alt={`${personEntity.name}'s cover`}
            className="cover-image"
          />
        ) : null}
      </div>
      <div className="profile-header">
        <div className="avatar-container">
          {personEntity.avatar ? (
            <img
              src={personEntity.avatar}
              alt={`${personEntity.name}'s avatar`}
              className="avatar-image"
            />
          ) : null}
        </div>
        <div className="profile-info">
          <div className="profile-name">{personEntity.name}</div>
          <div className="profile-bio">{personEntity.bio}</div>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-body-left">
          <ProfileMeta
            personEntity={personEntity}
            user={user}
            department={department}
          />
        </div>
        <div className="profile-content">
          <PostListViewProfile postList={postList} />
        </div>
      </div>
    </div>
  );
};

export default PersonDisplay;
