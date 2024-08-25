import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, ValidatedField, ValidatedForm, ValidatedBlobField, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import {
  getEntities as getAllRoomMember,
  deleteEntity as deleteRoomMember,
  getEntitiesByCurrentUser,
} from 'app/entities/room-member/room-member.reducer';
import {
  createEntity as createMessage,
  getEntities as getAllMessage,
  getEntitiesByRoom as getAllMessageByRoom,
} from 'app/entities/message/message.reducer';
import { createEntity as createRoom } from 'app/entities/room/room.reducer';
import './MessagePersonRoomMember.css';
import { convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import dayjs from 'dayjs';
export const MessagePersonRoomMember = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const roomMemberList = useAppSelector(state => state.roomMember.entities);
  const loading = useAppSelector(state => state.roomMember.loading);
  const currentUser = useAppSelector(state => state.authentication.account);

  const getAllEntities = () => {
    // dispatch(
    //   getAllRoomMember({
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

  ////////////////////////////

  const messageList = useAppSelector(state => state.message.entities);
  const loadingmessageList = useAppSelector(state => state.message.loading);
  const messageupdateSuccess = useAppSelector(state => state.message.updateSuccess);

  ///////////////////////////

  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedRoomMemberId, setSelectedRoomMemberId] = useState<string>('');
  const [selectedRoomMember, setSelectedRoomMember] = useState(null);
  useEffect(() => {
    // if (selectedRoomId) {
    //   dispatch(getAllMessageByRoom(selectedRoomId));
    // }
    socketRef.current = new WebSocket('ws://localhost:8000');
    //lich su chat
    socketRef.current.onmessage = event => {
      const { room: receivedRoom, text, username } = JSON.parse(event.data);
      if (receivedRoom === room) {
        setMessages(prevMessages => [...prevMessages, { text, username }]);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [selectedRoomId, selectedRoomMemberId]);

  useEffect(() => {
    if (selectedRoomId) {
      dispatch(getAllMessageByRoom(selectedRoomId));
    }
  }, [selectedRoomId, selectedRoomMemberId, messageupdateSuccess]);

  const handleRoomMemberClick = (roomMember, roommemberId, roomId) => {
    setSelectedRoomMember(roomMember);
    setSelectedRoomMemberId(roommemberId);
    setUsername(roommemberId);
    setSelectedRoomId(roomId);
    setRoom(roomId);
  };
  const joinRoom = () => {
    if (socketRef.current && room && username) {
      socketRef.current.send(JSON.stringify({ type: 'join', room, username }));
      setJoined(true);
    }
  };
  const sendMessage = () => {
    if (socketRef.current && inputValue && joined) {
      socketRef.current.send(JSON.stringify({ type: 'message', room, text: inputValue, username }));
      setInputValue('');
      saveEntity();
    }
  };
  const saveEntity = () => {
    const entity = {
      content: inputValue,
      createdAt: dayjs(),
      isActive: true,
      sender: selectedRoomMember,
      message: selectedRoomMember.room,
    };
    dispatch(createMessage(entity));
  };
  ////////////////////////////////////
  const [messages, setMessages] = useState<{ text: string; username: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  ////////////////////////////////////
  const saveRoomPrivate = () => {
    const entity = {
      name: `RoomPrivate-${dayjs()}`,
      isPrivate: true,
      createdAt: dayjs(),
    };
    dispatch(createRoom(entity));
  };

  const deleteRoomMember = () => {
    // dispatch(deleteRoomMember(selectedRoomMemberId));
  };
  return (
    <div className="MessagePersonRoomMember">
      <div className="MessagePersonRoomMember1">
        <div className="MessagePersonRoomMember11">
          <h2 id="room-member-heading" data-cy="RoomMemberHeading">
            <Translate contentKey="seaportApp.roomMember.home.title">Room Members</Translate>
            <div className="d-flex justify-content-end">
              <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
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
                      <Translate contentKey="seaportApp.roomMember.id">ID</Translate>{' '}
                      <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                    </th>
                    <th className="hand" onClick={sort('name')}>
                      <Translate contentKey="seaportApp.roomMember.name">Name</Translate>{' '}
                      <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                    </th>
                    {/* <th className="hand" onClick={sort('joinedAt')}>
                      <Translate contentKey="seaportApp.roomMember.joinedAt">Joined At</Translate>{' '}
                      <FontAwesomeIcon icon={getSortIconByFieldName('joinedAt')} />
                    </th> */}
                    {/* <th>
                      <Translate contentKey="seaportApp.roomMember.roommember">Roommember</Translate> <FontAwesomeIcon icon="sort" />
                    </th> */}
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
                      {/* <td>
                        {roomMember.joinedAt ? <TextFormat type="date" value={roomMember.joinedAt} format={APP_DATE_FORMAT} /> : null}
                      </td> */}
                      {/* <td>{roomMember.roommember ? roomMember.roommember.login : ''}</td> */}
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
        <div className="MessagePersonRoomMember1-messagelist-body">
          <div className="table-responsive MessagePersonRoomMember-message-list-container">
            {messageList && messageList.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th className="hand" onClick={sort('id')}>
                      <Translate contentKey="seaportApp.message.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                    </th>
                    <th className="hand" onClick={sort('content')}>
                      <Translate contentKey="seaportApp.message.content">Content</Translate>{' '}
                      <FontAwesomeIcon icon={getSortIconByFieldName('content')} />
                    </th>
                    {/* <th className="hand" onClick={sort('image')}>
                      <Translate contentKey="seaportApp.message.image">Image</Translate>{' '}
                      <FontAwesomeIcon icon={getSortIconByFieldName('image')} />
                    </th> */}
                    {/* <th className="hand" onClick={sort('isActive')}>
                      <Translate contentKey="seaportApp.message.isActive">Is Active</Translate>{' '}
                      <FontAwesomeIcon icon={getSortIconByFieldName('isActive')} />
                    </th> */}
                    <th className="hand" onClick={sort('createdAt')}>
                      <Translate contentKey="seaportApp.message.createdAt">Created At</Translate>{' '}
                      <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                    </th>
                    <th>
                      <Translate contentKey="seaportApp.message.sender">Sender</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    {/* <th>
                      <Translate contentKey="seaportApp.message.message">Message</Translate> <FontAwesomeIcon icon="sort" />
                    </th> */}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {messageList.map((message, i) => (
                    <tr key={`message-${i}`} data-cy="entityTable">
                      <td>
                        <Button tag={Link} to={`/message/${message.id}`} color="link" size="sm">
                          {message.id}
                        </Button>
                      </td>
                      <td>{message.content}</td>
                      {/* <td>
                        {message.image ? (
                          <div>
                            {message.imageContentType ? (
                              <img src={`data:${message.imageContentType};base64,${message.image}`} style={{ maxHeight: '30px' }} />
                            ) : null}
                          </div>
                        ) : null}
                      </td> */}
                      {/* <td>{message.isActive ? 'true' : 'false'}</td> */}
                      <td>{message.createdAt ? <TextFormat type="date" value={message.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                      <td>{message.sender ? <Link to={`/room-member/${message.sender.id}`}>{message.sender.name}</Link> : ''}</td>
                      {/* <td>{message.message ? <Link to={`/room/${message.message.id}`}>{message.message.name}</Link> : ''}</td> */}
                      <td className="text-end">
                        <div className="btn-group flex-btn-group-container">
                          {/* <Button tag={Link} to={`/message/${message.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button> */}
                          {/* <Button tag={Link} to={`/message/${message.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button> */}
                          {/* <Button
                            onClick={() => (window.location.href = `/message/${message.id}/delete`)}
                            color="danger"
                            size="sm"
                            data-cy="entityDeleteButton"
                          >
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                          </Button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              !loadingmessageList && (
                <div className="alert alert-warning">
                  <Translate contentKey="seaportApp.message.home.notFound">No Messages found</Translate>
                </div>
              )
            )}
          </div>
          <div>
            <div>
              {messages.map((message, index) => (
                <div key={index}>
                  <strong>{message.username}:</strong> {message.text}
                </div>
              ))}
            </div>
            <div className="MessagePersonRoomMember-message"></div>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePersonRoomMember;
