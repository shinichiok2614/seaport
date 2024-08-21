// src/main/webapp/app/entities/comment/comment-table-header.tsx

import React from 'react';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentTableHeader = ({ sortState, sort, getSortIconByFieldName }) => {
  return (
    <thead>
      <tr>
        <th className="hand" onClick={sort('id')}>
          <Translate contentKey="seaportApp.comment.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id', sortState)} />
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
    </thead>
  );
};

export default CommentTableHeader;
