import React from 'react';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, TextFormat } from 'react-jhipster';
import { Link } from 'react-router-dom';

const RoomMemberTable = ({ roomMemberList, loading, sort, getSortIconByFieldName, handleRoomMemberClick, joinRoom, saveRoomPrivate }) => (
  <div className="MessagePersonRoomMember11">
    <h2 id="room-member-heading" data-cy="RoomMemberHeading">
      <div className="d-flex justify-content-end">
        <Button className="me-2" color="info" disabled={loading}>
          <FontAwesomeIcon icon="sync" spin={loading} />{' '}
          <Translate contentKey="seaportApp.roomMember.home.refreshListLabel">Refresh List</Translate>
        </Button>
        <Button
          onClick={() => saveRoomPrivate()}
          className="btn btn-primary jh-create-entity"
          id="jh-create-entity"
          data-cy="entityCreateButton"
        >
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="seaportApp.room.home.createLabelPrivate">Create Room Private</Translate>
        </Button>
        <Link
          to="/messagepersonroommemberupdate/new"
          className="btn btn-primary jh-create-entity"
          id="jh-create-entity"
          data-cy="entityCreateButton"
        >
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="seaportApp.roomMember.home.createLabel">Create new Room Member</Translate>
        </Link>
      </div>
    </h2>
    <div className="table-responsive">
      {roomMemberList && roomMemberList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="seaportApp.roomMember.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
              </th>
              <th className="hand" onClick={sort('name')}>
                <Translate contentKey="seaportApp.roomMember.name">Name</Translate>{' '}
                <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
              </th>
              <th>
                <Translate contentKey="seaportApp.roomMember.room">Room</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {roomMemberList.map((roomMember, i) => (
              <tr
                key={`roomMember-${i}`}
                data-cy="entityTable"
                onClick={() => handleRoomMemberClick(roomMember, roomMember.roommember.id, roomMember.room.id)}
              >
                <td>
                  <Button tag={Link} to={`/room-member/${roomMember.id}`} color="link" size="sm">
                    {roomMember.id}
                  </Button>
                </td>
                <td>{roomMember.name}</td>
                <td>{roomMember.room ? <Link to={`/room/${roomMember.room.id}`}>{roomMember.room.name}</Link> : ''}</td>
                <td className="text-end">
                  <div className="btn-group flex-btn-group-container">
                    <Button onClick={() => joinRoom()} tag={Link} color="info" size="sm" data-cy="entityDetailsButton">
                      <FontAwesomeIcon icon="eye" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.join">Join</Translate>
                      </span>
                    </Button>
                    <Button
                      tag={Link}
                      onClick={() => (window.location.href = `/messagepersonroommemberinvite/${roomMember.room.id}`)}
                      color="primary"
                      size="sm"
                    >
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.invite">Invite</Translate>
                      </span>
                    </Button>
                    <Button
                      onClick={() => (window.location.href = `/room-member/${roomMember.id}/delete`)}
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
            <Translate contentKey="seaportApp.roomMember.home.notFound">No Room Members found</Translate>
          </div>
        )
      )}
    </div>
  </div>
);

export default RoomMemberTable;
