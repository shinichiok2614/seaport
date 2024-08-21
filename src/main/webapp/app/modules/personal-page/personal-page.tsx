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
import {
  faPhone,
  faGlobe,
  faMapMarkerAlt,
  faCalendarAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

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
  const currentUser = useAppSelector(state => state.authentication.account);
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
            {personEntity.id === currentUser.person?.id && (
              <Button
                tag={Link}
                to={`/personalupdatepage/${personEntity.id}`}
                replace
                color=""
              >
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </Button>
            )}
            {/* {personEntity.id === currentUser.person?.id && (
              <Button tag={Link} to={`/postpage/new`} replace color="primary">
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                <Translate contentKey="seaportApp.post.home.createLabel">
                  Create new Post
                </Translate>{' '}
              </Button>
            )} */}
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
          <div>
            <FontAwesomeIcon icon={faUser} /> {personEntity.bio}
          </div>
          <div>
            <FontAwesomeIcon icon={faPhone} /> {personEntity.phone}
          </div>
          <div>
            <FontAwesomeIcon icon={faGlobe} /> {personEntity.country}
          </div>
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {personEntity.address}
          </div>
          {/* &nbsp; */}
          {personEntity.createdAt && (
            <div>
              <FontAwesomeIcon icon={faCalendarAlt} />{' '}
              <TextFormat
                value={personEntity.createdAt}
                type="date"
                format={APP_DATE_FORMAT}
              />
            </div>
          )}
        </div>
      )}
      &nbsp;
      {activeTab === 'posts' && (
        <div className="posts">
          {personEntity.id === currentUser.person?.id &&
            currentUser.person?.isAuthor && (
              <Button tag={Link} to={`/postpage/new`} replace color="primary">
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                <Translate contentKey="seaportApp.post.home.createLabel">
                  Create new Post
                </Translate>{' '}
              </Button>
            )}
          {personEntity.id === currentUser.person?.id &&
            currentUser.person?.isAuthor && (
              <Button
                tag={Link}
                to={`/personlistpost/${currentUser.person?.id}`}
                replace
                color="primary"
              >
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                <Translate contentKey="seaportApp.post.home.listpost">
                  List Post
                </Translate>{' '}
              </Button>
            )}
          {postList.map((post, i) => (
            <PostCardView key={`entity-${i}`} post={post} hideRemark={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalPage;
