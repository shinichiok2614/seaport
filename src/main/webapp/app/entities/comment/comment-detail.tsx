import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './comment.reducer';

export const CommentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const commentEntity = useAppSelector(state => state.comment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="commentDetailsHeading">
          <Translate contentKey="seaportApp.comment.detail.title">Comment</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{commentEntity.id}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="seaportApp.comment.description">Description</Translate>
            </span>
          </dt>
          <dd>{commentEntity.description}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="seaportApp.comment.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {commentEntity.image ? (
              <div>
                {commentEntity.imageContentType ? (
                  <a onClick={openFile(commentEntity.imageContentType, commentEntity.image)}>
                    <img src={`data:${commentEntity.imageContentType};base64,${commentEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {commentEntity.imageContentType}, {byteSize(commentEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="seaportApp.comment.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{commentEntity.createdAt ? <TextFormat value={commentEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updateAt">
              <Translate contentKey="seaportApp.comment.updateAt">Update At</Translate>
            </span>
          </dt>
          <dd>{commentEntity.updateAt ? <TextFormat value={commentEntity.updateAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="seaportApp.comment.comment">Comment</Translate>
          </dt>
          <dd>{commentEntity.comment ? commentEntity.comment.login : ''}</dd>
          <dt>
            <Translate contentKey="seaportApp.comment.post">Post</Translate>
          </dt>
          <dd>{commentEntity.post ? commentEntity.post.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/comment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comment/${commentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CommentDetail;
