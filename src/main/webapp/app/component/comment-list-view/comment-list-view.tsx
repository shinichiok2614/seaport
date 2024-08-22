// src/main/webapp/app/entities/comment/comment-list.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATE_FORMAT } from 'app/config/constants';
import CommentTableHeader from '../comment-list-header/comment-table-header';
import CommentTableRow from '../comment-list-row/comment-table-row';

const CommentListView = ({ commentList, loading }) => {
  return (
    <div>
      <div className="table-responsive">
        {commentList && commentList.length > 0
          ? commentList.map((comment, i) => <CommentTableRow key={`entity-${i}`} comment={comment} />)
          : !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="seaportApp.comment.home.notFound">No Comments found</Translate>
              </div>
            )}
      </div>
    </div>
  );
};

export default CommentListView;
