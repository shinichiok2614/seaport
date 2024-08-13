// PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { APP_DATE_FORMAT } from 'app/config/constants';

const PostCard = ({ post }) => {
  return (
    <tr data-cy="entityTable">
      <td>
        <Button tag={Link} to={`/post/${post.id}`} color="link" size="sm">
          {post.id}
        </Button>
      </td>
      <td>{post.name}</td>
      <td>{post.summary}</td>
      <td>
        {post.image ? (
          <div>
            {post.imageContentType ? (
              <a onClick={() => openFile(post.imageContentType, post.image)}>
                <img
                  src={`data:${post.imageContentType};base64,${post.image}`}
                  style={{ maxHeight: '30px' }}
                />
                &nbsp;
              </a>
            ) : null}
            <span>
              {post.imageContentType}, {byteSize(post.image)}
            </span>
          </div>
        ) : null}
      </td>
      <td>
        <Translate contentKey={`seaportApp.Status.${post.status}`} />
      </td>
      <td>{post.view}</td>
      <td>{post.remark}</td>
      <td>
        {post.createdAt ? (
          <TextFormat
            type="date"
            value={post.createdAt}
            format={APP_DATE_FORMAT}
          />
        ) : null}
      </td>
      <td>
        {post.updateAt ? (
          <TextFormat
            type="date"
            value={post.updateAt}
            format={APP_DATE_FORMAT}
          />
        ) : null}
      </td>
      <td>
        {post.approvedAt ? (
          <TextFormat
            type="date"
            value={post.approvedAt}
            format={APP_DATE_FORMAT}
          />
        ) : null}
      </td>
      <td>
        {post.modifiedAt ? (
          <TextFormat
            type="date"
            value={post.modifiedAt}
            format={APP_DATE_FORMAT}
          />
        ) : null}
      </td>
      <td>
        {post.category ? (
          <Link to={`/category/${post.category.id}`}>{post.category.name}</Link>
        ) : (
          ''
        )}
      </td>
      <td>{post.post ? post.post.login : ''}</td>
      <td className="text-end">
        <div className="btn-group flex-btn-group-container">
          <Button
            tag={Link}
            to={`/postapprovepageremark/${post.id}`}
            color="info"
            size="sm"
            data-cy="entityDetailsButton"
          >
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.view">View</Translate>
            </span>
          </Button>
          <Button
            tag={Link}
            to={`/post/${post.id}/edit`}
            color="primary"
            size="sm"
            data-cy="entityEditButton"
          >
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
          <Button
            onClick={() => (window.location.href = `/post/${post.id}/delete`)}
            color="danger"
            size="sm"
            data-cy="entityDeleteButton"
          >
            <FontAwesomeIcon icon="trash" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.delete">Delete</Translate>
            </span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default PostCard;
