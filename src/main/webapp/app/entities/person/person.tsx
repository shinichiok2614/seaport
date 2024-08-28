import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, updateEntity } from './person.reducer';

export const Person = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const personList = useAppSelector(state => state.person.entities);
  const loading = useAppSelector(state => state.person.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  const handleUpdateAuthor = values => {
    const entity = {
      ...values,
      isAuthor: !values.isAuthor,
    };
    dispatch(updateEntity(entity));
  };
  return (
    <div>
      <h2 id="person-heading" data-cy="PersonHeading">
        <Translate contentKey="seaportApp.person.home.title">People</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="seaportApp.person.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/person/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="seaportApp.person.home.createLabel">Create new Person</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {personList && personList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="seaportApp.person.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="seaportApp.person.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('avatar')}>
                  <Translate contentKey="seaportApp.person.avatar">Avatar</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('avatar')} />
                </th>
                <th className="hand" onClick={sort('cover')}>
                  <Translate contentKey="seaportApp.person.cover">Cover</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('cover')} />
                </th>
                <th className="hand" onClick={sort('bio')}>
                  <Translate contentKey="seaportApp.person.bio">Bio</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('bio')} />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  <Translate contentKey="seaportApp.person.phone">Phone</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('phone')} />
                </th>
                <th className="hand" onClick={sort('country')}>
                  <Translate contentKey="seaportApp.person.country">Country</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('country')} />
                </th>
                <th className="hand" onClick={sort('address')}>
                  <Translate contentKey="seaportApp.person.address">Address</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('address')} />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="seaportApp.person.createdAt">Created At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                </th>
                <th className="hand" onClick={sort('updateAt')}>
                  <Translate contentKey="seaportApp.person.updateAt">Update At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('updateAt')} />
                </th>
                <th className="hand" onClick={sort('dateOfBirth')}>
                  <Translate contentKey="seaportApp.person.dateOfBirth">Date Of Birth</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('dateOfBirth')} />
                </th>
                <th className="hand" onClick={sort('isAuthor')}>
                  <Translate contentKey="seaportApp.person.isAuthor">Is Author</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('isAuthor')} />
                </th>
                <th>
                  <Translate contentKey="seaportApp.person.user">User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="seaportApp.person.department">Department</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {personList.map((person, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/person/${person.id}`} color="link" size="sm">
                      {person.id}
                    </Button>
                  </td>
                  <td>{person.name}</td>
                  <td>
                    {person.avatar ? (
                      <div>
                        {person.avatarContentType ? (
                          <a onClick={openFile(person.avatarContentType, person.avatar)}>
                            <img src={`data:${person.avatarContentType};base64,${person.avatar}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {person.avatarContentType}, {byteSize(person.avatar)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {person.cover ? (
                      <div>
                        {person.coverContentType ? (
                          <a onClick={openFile(person.coverContentType, person.cover)}>
                            <img src={`data:${person.coverContentType};base64,${person.cover}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {person.coverContentType}, {byteSize(person.cover)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{person.bio}</td>
                  <td>{person.phone}</td>
                  <td>{person.country}</td>
                  <td>{person.address}</td>
                  <td>{person.createdAt ? <TextFormat type="date" value={person.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{person.updateAt ? <TextFormat type="date" value={person.updateAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{person.dateOfBirth ? <TextFormat type="date" value={person.dateOfBirth} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{person.isAuthor ? 'true' : 'false'}</td>
                  <td>{person.user ? person.user.id : ''}</td>
                  <td>{person.department ? <Link to={`/department/${person.department.id}`}>{person.department.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        onClick={() => handleUpdateAuthor(person)}
                        color={person.isAuthor ? 'danger' : 'success'}
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          {person.isAuthor ? (
                            <Translate contentKey="entity.action.disableAuthor">View</Translate>
                          ) : (
                            <Translate contentKey="entity.action.updateAuthor">View</Translate>
                          )}
                        </span>
                      </Button>
                      <Button tag={Link} to={`/person/${person.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/person/${person.id}/delete`)}
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
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="seaportApp.person.home.notFound">No People found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Person;
