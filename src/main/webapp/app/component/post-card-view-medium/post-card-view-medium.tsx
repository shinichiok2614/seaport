import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faCommentDots,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import './PostCardMedium.css';

const PostCardViewMedium = ({
  post,
  hideImage = false,
  hidePersonAvatar = true,
}) => {
  if (!post) {
    return <p>Loading...</p>;
  }
  const navigate = useNavigate();
  const handlePostName = () => {
    navigate(`/postpage/${post.id}`);
  };
  const handlePersonName = () => {
    navigate(`/personalpage/${post.person.id}`);
  };
  return (
    <div className="medium">
      <div>
        {!hideImage && (
          <div className="medium1">
            {post.image && (
              <img src={`data:${post.imageContentType};base64,${post.image}`} />
            )}
          </div>
        )}
        {post.category && <div className="medium2">{post.category.name}</div>}
        <div className="medium3" onClick={handlePostName}>
          {post.name}
        </div>
        {post.person && (
          <div className="medium6" onClick={handlePersonName}>
            {post.person.name}
          </div>
        )}
        <div className="medium4">{post.summary}</div>
      </div>
      <div>
        {!hidePersonAvatar && (
          <img
            src={`data:${post.person.avatarContentType};base64,${post.person.avatar}`}
            className="medium7"
            onClick={handlePersonName}
          />
        )}
        <div className="medium5">
          <div>
            <FontAwesomeIcon icon={faEye} /> {post.view}
          </div>
          {post.createdAt && (
            <div>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>
                <TextFormat
                  type="date"
                  value={post.createdAt}
                  format="YYYY-MM-DD"
                />
              </span>
            </div>
          )}
          <div>
            <FontAwesomeIcon icon={faCommentDots} /> {post.commentsCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardViewMedium;
