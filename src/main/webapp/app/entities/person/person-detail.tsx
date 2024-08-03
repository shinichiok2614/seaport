import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './person.reducer';

export const PersonDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const personEntity = useAppSelector(state => state.person.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="personDetailsHeading">
          <Translate contentKey="seaportApp.person.detail.title">Person</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{personEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="seaportApp.person.name">Name</Translate>
            </span>
          </dt>
          <dd>{personEntity.name}</dd>
          <dt>
            <span id="avatar">
              <Translate contentKey="seaportApp.person.avatar">Avatar</Translate>
            </span>
          </dt>
          <dd>
            {personEntity.avatar ? (
              <div>
                {personEntity.avatarContentType ? (
                  <a onClick={openFile(personEntity.avatarContentType, personEntity.avatar)}>
                    <img src={`data:${personEntity.avatarContentType};base64,${personEntity.avatar}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {personEntity.avatarContentType}, {byteSize(personEntity.avatar)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="cover">
              <Translate contentKey="seaportApp.person.cover">Cover</Translate>
            </span>
          </dt>
          <dd>
            {personEntity.cover ? (
              <div>
                {personEntity.coverContentType ? (
                  <a onClick={openFile(personEntity.coverContentType, personEntity.cover)}>
                    <img src={`data:${personEntity.coverContentType};base64,${personEntity.cover}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {personEntity.coverContentType}, {byteSize(personEntity.cover)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="bio">
              <Translate contentKey="seaportApp.person.bio">Bio</Translate>
            </span>
          </dt>
          <dd>{personEntity.bio}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="seaportApp.person.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{personEntity.phone}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="seaportApp.person.country">Country</Translate>
            </span>
          </dt>
          <dd>{personEntity.country}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="seaportApp.person.address">Address</Translate>
            </span>
          </dt>
          <dd>{personEntity.address}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="seaportApp.person.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{personEntity.createdAt ? <TextFormat value={personEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updateAt">
              <Translate contentKey="seaportApp.person.updateAt">Update At</Translate>
            </span>
          </dt>
          <dd>{personEntity.updateAt ? <TextFormat value={personEntity.updateAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="dateOfBirth">
              <Translate contentKey="seaportApp.person.dateOfBirth">Date Of Birth</Translate>
            </span>
          </dt>
          <dd>{personEntity.dateOfBirth ? <TextFormat value={personEntity.dateOfBirth} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="isAuthor">
              <Translate contentKey="seaportApp.person.isAuthor">Is Author</Translate>
            </span>
          </dt>
          <dd>{personEntity.isAuthor ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="seaportApp.person.user">User</Translate>
          </dt>
          <dd>{personEntity.user ? personEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="seaportApp.person.department">Department</Translate>
          </dt>
          <dd>{personEntity.department ? personEntity.department.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/person" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/person/${personEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PersonDetail;
