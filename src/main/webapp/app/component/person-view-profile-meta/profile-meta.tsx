import React from 'react';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faGlobe, faCalendarAlt, faUser, faBuilding, faCheck } from '@fortawesome/free-solid-svg-icons';
import './ProfileMeta.css'; // Thêm file CSS để tạo kiểu

const ProfileMeta = ({ personEntity, user, department }) => {
  return (
    <div className="profile-meta">
      {personEntity.phone && (
        <div className="profile-meta-item">
          <FontAwesomeIcon icon={faPhone} className="profile-meta-icon" />
          <span>{personEntity.phone}</span>
        </div>
      )}
      {personEntity.country && (
        <div className="profile-meta-item">
          <FontAwesomeIcon icon={faGlobe} className="profile-meta-icon" />
          <span>{personEntity.country}</span>
        </div>
      )}
      {personEntity.address && (
        <div className="profile-meta-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="profile-meta-icon" />
          <span>{personEntity.address}</span>
        </div>
      )}
      {personEntity.createdAt && (
        <div className="profile-meta-item">
          <FontAwesomeIcon icon={faCalendarAlt} className="profile-meta-icon" />
          <span>
            <TextFormat type="date" value={personEntity.createdAt} format="YYYY-MM-DD" />
          </span>
        </div>
      )}
      {personEntity.updateAt && (
        <div className="profile-meta-item">
          <FontAwesomeIcon icon={faCalendarAlt} className="profile-meta-icon" />
          <span>
            <TextFormat type="date" value={personEntity.updateAt} format="YYYY-MM-DD" />
          </span>
        </div>
      )}
      {personEntity.dateOfBirth && (
        <div className="profile-meta-item">
          <FontAwesomeIcon icon={faCalendarAlt} className="profile-meta-icon" />
          <span>
            <TextFormat type="date" value={personEntity.dateOfBirth} format="YYYY-MM-DD" />
          </span>
        </div>
      )}
      <div className="profile-meta-item">
        <FontAwesomeIcon icon={faCheck} className="profile-meta-icon" />
        <span>{personEntity.isAuthor ? 'Author' : 'Not an Author'}</span>
      </div>
      <div className="profile-meta-item">
        <FontAwesomeIcon icon={faUser} className="profile-meta-icon" />
        <span>User ID: {user.id}</span>
      </div>
      <div className="profile-meta-item">
        <FontAwesomeIcon icon={faBuilding} className="profile-meta-icon" />
        <span>Department: {department.name}</span>
      </div>
    </div>
  );
};

export default ProfileMeta;
