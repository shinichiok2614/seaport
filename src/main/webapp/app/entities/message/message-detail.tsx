import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './message.reducer';

export const MessageDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const messageEntity = useAppSelector(state => state.message.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="messageDetailsHeading">
          <Translate contentKey="seaportApp.message.detail.title">Message</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{messageEntity.id}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="seaportApp.message.content">Content</Translate>
            </span>
          </dt>
          <dd>{messageEntity.content}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="seaportApp.message.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {messageEntity.image ? (
              <div>
                {messageEntity.imageContentType ? (
                  <a onClick={openFile(messageEntity.imageContentType, messageEntity.image)}>
                    <img src={`data:${messageEntity.imageContentType};base64,${messageEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {messageEntity.imageContentType}, {byteSize(messageEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="isActive">
              <Translate contentKey="seaportApp.message.isActive">Is Active</Translate>
            </span>
          </dt>
          <dd>{messageEntity.isActive ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="seaportApp.message.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{messageEntity.createdAt ? <TextFormat value={messageEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="seaportApp.message.sender">Sender</Translate>
          </dt>
          <dd>{messageEntity.sender ? messageEntity.sender.name : ''}</dd>
          <dt>
            <Translate contentKey="seaportApp.message.message">Message</Translate>
          </dt>
          <dd>{messageEntity.message ? messageEntity.message.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/message" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/message/${messageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MessageDetail;
