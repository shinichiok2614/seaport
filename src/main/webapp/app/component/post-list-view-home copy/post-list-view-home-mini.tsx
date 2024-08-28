import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCommentDots, faEye } from '@fortawesome/free-solid-svg-icons';

export const PostCardViewMini = ({ post, hideImage = false, hidesumary = false, hidePersonAvatar = true, hideRemark = false }) => {
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
    <div className="post-card">
      <div className="post-card-header">
        {!hideImage && post.image && <img src={`data:${post.imageContentType};base64,${post.image}`} />}
        <div className="post-card-title">
          {post.category && (
            <div className="post-card-category">
              <div>{post.category.name}</div>
            </div>
          )}
          <div className="post-card-name-mini" onClick={handlePostName}>
            {post.name}
          </div>
          {/* {post.person && (
            <div className="post-card-login" onClick={handlePersonName}>
              <span>{post.person.name}</span>
              <div>{!hidePersonAvatar && <img src={post.person.avatar} className="post-person-avatar" />}</div>
            </div>
          )} */}
        </div>
      </div>
      {/* {!hidesumary && <div className="post-card-summary">{post.summary}</div>}
      <div className="post-card-meta">
        <div className="post-card-meta-item">
          <FontAwesomeIcon icon={faEye} /> {post.view}
        </div>
        {post.createdAt && (
          <div className="post-card-meta-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>
              <TextFormat type="date" value={post.createdAt} format="YYYY-MM-DD" />
            </span>
          </div>
        )}
        <div className="post-card-meta-item">
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </div> */}
      {/* {!hideRemark && (
        <div className="post-card-meta">
          {post.updateAt && (
            <div className="post-card-meta-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>
                <TextFormat type="date" value={post.updateAt} format="YYYY-MM-DD" />
              </span>
            </div>
          )}
          {post.approvedAt && (
            <div className="post-card-meta-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>
                <TextFormat type="date" value={post.approvedAt} format="YYYY-MM-DD" />
              </span>
            </div>
          )}
          {post.modifiedAt && (
            <div className="post-card-meta-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>
                <TextFormat type="date" value={post.modifiedAt} format="YYYY-MM-DD" />
              </span>
            </div>
          )}
          <div className="post-card-meta-item">{post.remark}</div>
        </div>
      )} */}
    </div>
  );
};

export default PostCardViewMini;
