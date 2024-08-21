import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getRooms } from 'app/entities/room/room.reducer';
import { getEntitiesByCurrentUser } from 'app/entities/room-member/room-member.reducer';

export const MessagePerson = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const roomList = useAppSelector(state => state.room.entities);
  const loading = useAppSelector(state => state.room.loading);

  const getAllEntities = () => {
    // dispatch(
    //   getRooms({
    //     sort: `${sortState.sort},${sortState.order}`,
    //   }),
    // );
    dispatch(getEntitiesByCurrentUser());
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
    // sortEntities();
    getAllEntities();
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
  // const publicRooms = roomList.filter(room => !room.isPrivate).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // const privateRooms = roomList.filter(room => room.isPrivate).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const publicRooms = roomList.filter(room => !room.isPrivate);
  const privateRooms = roomList.filter(room => room.isPrivate);

  return (
    <div>
      <h2 id="room-heading" data-cy="RoomHeading">
        <Translate contentKey="seaportApp.room.home.title">Rooms</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="seaportApp.room.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/messagepersonroomupdate/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="seaportApp.room.home.createLabel">Create new Room</Translate>
          </Link>
        </div>
      </h2>
      {/* <div className="table-responsive">
        {roomList && roomList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="seaportApp.room.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="seaportApp.room.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('isPrivate')}>
                  <Translate contentKey="seaportApp.room.isPrivate">Is Private</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('isPrivate')} />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="seaportApp.room.createdAt">Created At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {roomList.map((room, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/room/${room.id}`} color="link" size="sm">
                      {room.id}
                    </Button>
                  </td>
                  <td>{room.name}</td>
                  <td>{room.isPrivate ? 'true' : 'false'}</td>
                  <td>{room.createdAt ? <TextFormat type="date" value={room.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/room/${room.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/room/${room.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/room/${room.id}/delete`)}
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
              <Translate contentKey="seaportApp.room.home.notFound">No Rooms found</Translate>
            </div>
          )
        )}
      </div> */}
      {/* Danh sách room public */}
      <h3>
        <Translate contentKey="seaportApp.room.publicRooms">Public Rooms</Translate>
      </h3>
      <div className="table-responsive">
        {publicRooms.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="seaportApp.room.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="seaportApp.room.createdAt">Created At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                </th>
              </tr>
            </thead>
            <tbody>
              {publicRooms.map((room, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/room/${room.id}`} color="link" size="sm">
                      {room.name}
                    </Button>
                  </td>
                  <td>{room.createdAt ? <TextFormat type="date" value={room.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="seaportApp.room.home.notFound">No Public Rooms found</Translate>
            </div>
          )
        )}
      </div>

      {/* Danh sách room private */}
      <h3>
        <Translate contentKey="seaportApp.room.privateRooms">Private Rooms</Translate>
      </h3>
      <div className="table-responsive">
        {privateRooms.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="seaportApp.room.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="seaportApp.room.createdAt">Created At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                </th>
              </tr>
            </thead>
            <tbody>
              {privateRooms.map((room, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/room/${room.id}`} color="link" size="sm">
                      {room.name}
                    </Button>
                  </td>
                  <td>{room.createdAt ? <TextFormat type="date" value={room.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="seaportApp.room.home.notFound">No Private Rooms found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MessagePerson;
