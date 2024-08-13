// src/main/webapp/app/entities/comment/comment-table-row.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATE_FORMAT } from 'app/config/constants';
import './CommentTableRow.css';
const CommentTableRow = ({ comment }) => {
  return (
    <div className="CommentTableRow">
      <div className="CommentTableRow1">
        <div>{comment.comment ? comment.comment.login : ''}</div>
      </div>
      <div className="CommentTableRow2">
        <div>{comment.description}</div>
        {comment.image ? (
          <div>
            {comment.imageContentType ? (
              <a onClick={openFile(comment.imageContentType, comment.image)}>
                <img
                  src={`data:${comment.imageContentType};base64,${comment.image}`}
                  style={{ maxHeight: '100px' }}
                />
              </a>
            ) : null}
          </div>
        ) : null}
        <div>
          {comment.createdAt ? (
            <TextFormat
              type="date"
              value={comment.createdAt}
              format={APP_DATE_FORMAT}
            />
          ) : null}
        </div>
      </div>
    </div>
    // <tr data-cy="entityTable">
    //   <td>
    //     <Button tag={Link} to={`/comment/${comment.id}`} color="link" size="sm">
    //       {comment.id}
    //     </Button>
    //   </td>
    //   <td>{comment.description}</td>
    //   <td>
    //     {comment.image ? (
    //       <div>
    //         {comment.imageContentType ? (
    //           <a onClick={openFile(comment.imageContentType, comment.image)}>
    //             <img src={`data:${comment.imageContentType};base64,${comment.image}`} style={{ maxHeight: '30px' }} />
    //             &nbsp;
    //           </a>
    //         ) : null}
    //         <span>
    //           {comment.imageContentType}, {byteSize(comment.image)}
    //         </span>
    //       </div>
    //     ) : null}
    //   </td>
    //   <td>{comment.createdAt ? <TextFormat type="date" value={comment.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
    //   <td>{comment.updateAt ? <TextFormat type="date" value={comment.updateAt} format={APP_DATE_FORMAT} /> : null}</td>
    //   <td>{comment.post ? <Link to={`/post/${comment.post.id}`}>{comment.post.name}</Link> : ''}</td>
    //   <td>{comment.comment ? comment.comment.login : ''}</td>
    //   <td className="text-end">
    //     <div className="btn-group flex-btn-group-container">
    //       <Button tag={Link} to={`/comment/${comment.id}`} color="info" size="sm" data-cy="entityDetailsButton">
    //         <FontAwesomeIcon icon="eye" />{' '}
    //         <span className="d-none d-md-inline">
    //           <Translate contentKey="entity.action.view">View</Translate>
    //         </span>
    //       </Button>
    //       <Button tag={Link} to={`/comment/${comment.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
    //         <FontAwesomeIcon icon="pencil-alt" />{' '}
    //         <span className="d-none d-md-inline">
    //           <Translate contentKey="entity.action.edit">Edit</Translate>
    //         </span>
    //       </Button>
    //       <Button
    //         onClick={() => (window.location.href = `/comment/${comment.id}/delete`)}
    //         color="danger"
    //         size="sm"
    //         data-cy="entityDeleteButton"
    //       >
    //         <FontAwesomeIcon icon="trash" />{' '}
    //         <span className="d-none d-md-inline">
    //           <Translate contentKey="entity.action.delete">Delete</Translate>
    //         </span>
    //       </Button>
    //     </div>
    //   </td>
    // </tr>
  );
};

export default CommentTableRow;
