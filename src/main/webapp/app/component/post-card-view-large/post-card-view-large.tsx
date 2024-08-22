import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faCommentDots, faEye } from '@fortawesome/free-solid-svg-icons';
import './PostCardRight.css';

const PostCardViewRight = ({ post }) => {
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
    <div className="post1">
      <div className="post11">
        {post.category && (
          <div className="post111">
            <div>{post.category.name}</div>
          </div>
        )}
        <div className="post112" onClick={handlePostName}>
          {post.name}
        </div>
        {post.person && (
          <div className="post113" onClick={handlePersonName}>
            <span>{post.person.name}</span>
          </div>
        )}
        <div className="post114">{post.summary}</div>
        <div className="post115-body">
          <div className="post115">
            <FontAwesomeIcon icon={faEye} /> {post.view}
          </div>
          {post.createdAt && (
            <div className="116">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>
                <TextFormat type="date" value={post.createdAt} format="YYYY-MM-DD" />
              </span>
            </div>
          )}
          <div className="post117">
            <FontAwesomeIcon icon={faCommentDots} />
          </div>
        </div>
        {/* {post.updateAt && (
          <div className="post118">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>
              <TextFormat type="date" value={post.updateAt} format="YYYY-MM-DD" />
            </span>
          </div>
        )}
        {post.approvedAt && (
          <div className="post119">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>
              <TextFormat type="date" value={post.approvedAt} format="YYYY-MM-DD" />
            </span>
          </div>
        )}
        {post.modifiedAt && (
          <div className="post11-10">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>
              <TextFormat type="date" value={post.modifiedAt} format="YYYY-MM-DD" />
            </span>
          </div>
        )}
        <div className="post11-11">{post.remark}</div> */}
      </div>
      <div className="post12" onClick={handlePostName}>
        {post.image && <img src={`data:${post.imageContentType};base64,${post.image}`} alt="Post Image" />}
      </div>
    </div>
  );
};

export default PostCardViewRight;
