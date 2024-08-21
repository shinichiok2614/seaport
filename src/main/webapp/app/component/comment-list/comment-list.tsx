// src/main/webapp/app/entities/comment/comment-list.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATE_FORMAT } from 'app/config/constants';
import CommentTableHeader from '../comment-list-header/comment-table-header';
import CommentTableRow from '../comment-list-row/comment-table-row';

const CommentList = ({
  commentList,
  loading,
  sortState,
  sort,
  getSortIconByFieldName,
}) => {
  return (
    <div>
      <div className="table-responsive">
        {commentList && commentList.length > 0 ? (
          <Table responsive>
            {/* <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="seaportApp.comment.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id', sortState)} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="seaportApp.comment.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description', sortState)} />
                </th>
                <th className="hand" onClick={sort('image')}>
                  <Translate contentKey="seaportApp.comment.image">Image</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('image', sortState)} />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="seaportApp.comment.createdAt">Created At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdAt', sortState)} />
                </th>
                <th className="hand" onClick={sort('updateAt')}>
                  <Translate contentKey="seaportApp.comment.updateAt">Update At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('updateAt', sortState)} />
                </th>
                <th>
                  <Translate contentKey="seaportApp.comment.post">Post</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="seaportApp.comment.comment">Comment</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead> */}
            <CommentTableHeader
              sortState={sortState}
              sort={sort}
              getSortIconByFieldName={getSortIconByFieldName}
            />
            <tbody>
              {commentList.map((comment, i) => (
                <CommentTableRow key={`entity-${i}`} comment={comment} />
                // <tr key={`entity-${i}`} data-cy="entityTable">
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
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="seaportApp.comment.home.notFound">
                No Comments found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CommentList;
