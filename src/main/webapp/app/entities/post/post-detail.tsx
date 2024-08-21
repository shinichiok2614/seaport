import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './post.reducer';

export const PostDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const postEntity = useAppSelector(state => state.post.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="postDetailsHeading">
          <Translate contentKey="seaportApp.post.detail.title">Post</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{postEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="seaportApp.post.name">Name</Translate>
            </span>
          </dt>
          <dd>{postEntity.name}</dd>
          <dt>
            <span id="summary">
              <Translate contentKey="seaportApp.post.summary">Summary</Translate>
            </span>
          </dt>
          <dd>{postEntity.summary}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="seaportApp.post.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {postEntity.image ? (
              <div>
                {postEntity.imageContentType ? (
                  <a onClick={openFile(postEntity.imageContentType, postEntity.image)}>
                    <img src={`data:${postEntity.imageContentType};base64,${postEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {postEntity.imageContentType}, {byteSize(postEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="seaportApp.post.status">Status</Translate>
            </span>
          </dt>
          <dd>{postEntity.status}</dd>
          <dt>
            <span id="view">
              <Translate contentKey="seaportApp.post.view">View</Translate>
            </span>
          </dt>
          <dd>{postEntity.view}</dd>
          <dt>
            <span id="remark">
              <Translate contentKey="seaportApp.post.remark">Remark</Translate>
            </span>
          </dt>
          <dd>{postEntity.remark}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="seaportApp.post.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{postEntity.createdAt ? <TextFormat value={postEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updateAt">
              <Translate contentKey="seaportApp.post.updateAt">Update At</Translate>
            </span>
          </dt>
          <dd>{postEntity.updateAt ? <TextFormat value={postEntity.updateAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="approvedAt">
              <Translate contentKey="seaportApp.post.approvedAt">Approved At</Translate>
            </span>
          </dt>
          <dd>{postEntity.approvedAt ? <TextFormat value={postEntity.approvedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="modifiedAt">
              <Translate contentKey="seaportApp.post.modifiedAt">Modified At</Translate>
            </span>
          </dt>
          <dd>{postEntity.modifiedAt ? <TextFormat value={postEntity.modifiedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="seaportApp.post.post">Post</Translate>
          </dt>
          <dd>{postEntity.post ? postEntity.post.login : ''}</dd>
          <dt>
            <Translate contentKey="seaportApp.post.category">Category</Translate>
          </dt>
          <dd>{postEntity.category ? postEntity.category.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/post" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/post/${postEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PostDetail;
