import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './paragraph.reducer';

export const ParagraphDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const paragraphEntity = useAppSelector(state => state.paragraph.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paragraphDetailsHeading">
          <Translate contentKey="seaportApp.paragraph.detail.title">Paragraph</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{paragraphEntity.id}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="seaportApp.paragraph.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {paragraphEntity.image ? (
              <div>
                {paragraphEntity.imageContentType ? (
                  <a onClick={openFile(paragraphEntity.imageContentType, paragraphEntity.image)}>
                    <img src={`data:${paragraphEntity.imageContentType};base64,${paragraphEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {paragraphEntity.imageContentType}, {byteSize(paragraphEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="caption">
              <Translate contentKey="seaportApp.paragraph.caption">Caption</Translate>
            </span>
          </dt>
          <dd>{paragraphEntity.caption}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="seaportApp.paragraph.content">Content</Translate>
            </span>
          </dt>
          <dd>{paragraphEntity.content}</dd>
          <dt>
            <span id="contentType">
              <Translate contentKey="seaportApp.paragraph.contentType">Content Type</Translate>
            </span>
          </dt>
          <dd>{paragraphEntity.contentType}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="seaportApp.paragraph.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {paragraphEntity.createdAt ? <TextFormat value={paragraphEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="seaportApp.paragraph.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>
            {paragraphEntity.updatedAt ? <TextFormat value={paragraphEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="seaportApp.paragraph.paragraph">Paragraph</Translate>
          </dt>
          <dd>{paragraphEntity.paragraph ? paragraphEntity.paragraph.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/paragraph" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/paragraph/${paragraphEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ParagraphDetail;
