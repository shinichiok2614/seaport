import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity as getPerson } from 'app/entities/person/person.reducer';
import { getEntitiesByPerson } from 'app/entities/post/post.reducer';
import PostCardView from 'app/component/post-card-view/post-card-view';
import './personal-page.css';

export const PersonalPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getPerson(id));
    dispatch(getEntitiesByPerson(id));
  }, []);

  const personEntity = useAppSelector(state => state.person.entity);
  const postList = useAppSelector(state => state.post.entities);
  const postloading = useAppSelector(state => state.post.loading);
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="PersonalPage">
      {personEntity.cover ? (
        <div className="PersonalPage-cover">
          {personEntity.coverContentType ? (
            <img
              src={`data:${personEntity.coverContentType};base64,${personEntity.cover}`}
            />
          ) : null}
        </div>
      ) : null}
      <div className="PersonalPage-profile-header">
        <div className="PersonalPage-avatar-container">
          {personEntity.avatar && personEntity.avatarContentType ? (
            <img
              src={`data:${personEntity.avatarContentType};base64,${personEntity.avatar}`}
              className="PersonalPage-avatar"
              alt="Avatar"
            />
          ) : (
            <div className="avatar-placeholder"></div>
          )}
        </div>
        <div className="PersonalPage12">
          <div className="PersonalPage221">
            <h2>{personEntity.name}</h2>
            <Button
              tag={Link}
              to={`/personalupdatepage/${personEntity.id}`}
              replace
              color="primary"
            >
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </Button>
          </div>
          <div className="profile-stats">
            <span>
              <strong>{postList.length}</strong> posts
            </span>
            <span>
              <strong>200</strong> followers
            </span>
            <span>
              <strong>180</strong> following
            </span>
          </div>
        </div>
      </div>
      <div className="PersonalPage-tabs">
        <Button
          color={activeTab === 'about' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('about')}
        >
          About
        </Button>
        <Button
          color={activeTab === 'posts' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </Button>
        <Button
          color={activeTab === 'posts' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('posts')}
        >
          Follower
        </Button>
        <Button
          color={activeTab === 'posts' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('posts')}
        >
          Following
        </Button>
      </div>
      {activeTab === 'about' && (
        <div className="profile-bio">
          <div>{personEntity.bio}</div>
          <div>{personEntity.phone}</div>
          <div>{personEntity.country}</div>
          <div>{personEntity.address}</div>
          {personEntity.createdAt && (
            <TextFormat
              value={personEntity.createdAt}
              type="date"
              format={APP_DATE_FORMAT}
            />
          )}
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="posts">
          {postList.map((post, i) => (
            <PostCardView key={`entity-${i}`} post={post} hideRemark={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalPage;
