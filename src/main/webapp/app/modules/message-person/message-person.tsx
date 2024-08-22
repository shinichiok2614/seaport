// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Button, Table } from 'reactstrap';
// import { Translate, TextFormat, getSortState } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
// import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
// import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
// import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
// import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { createEntity as createRoom, getEntities as getRooms } from 'app/entities/room/room.reducer';
// import { getEntitiesByCurrentUser, createEntity as createRoommember } from 'app/entities/room-member/room-member.reducer';
// import dayjs from 'dayjs';

// export const MessagePerson = () => {
//   const dispatch = useAppDispatch();

//   const pageLocation = useLocation();
//   const navigate = useNavigate();

//   const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

//   const [creating, setCreating] = useState(false);
//   const [newRoom, setNewRoom] = useState(null);
//   const [creatingRoommember, setCreatingRoommember] = useState(false);
//   const [newRoommember, setNewRoommember] = useState(null);

//   const roomList = useAppSelector(state => state.room.entities);
//   const loading = useAppSelector(state => state.room.loading);
//   const roommembers = useAppSelector(state => state.roomMember.entities);
//   const loadingRoommembers = useAppSelector(state => state.roomMember.loading);
//   const roommember = useAppSelector(state => state.roomMember.entity);
//   const currentUser = useAppSelector(state => state.authentication.account);

//   const getAllEntities = () => {
//     // dispatch(
//     //   getRooms({
//     //     sort: `${sortState.sort},${sortState.order}`,
//     //   }),
//     // );
//     dispatch(getEntitiesByCurrentUser());
//   };

//   const sortEntities = () => {
//     getAllEntities();
//     const endURL = `?sort=${sortState.sort},${sortState.order}`;
//     if (pageLocation.search !== endURL) {
//       navigate(`${pageLocation.pathname}${endURL}`);
//     }
//   };

//   useEffect(() => {
//     sortEntities();
//   }, [sortState.order, sortState.sort]);

//   const sort = p => () => {
//     setSortState({
//       ...sortState,
//       order: sortState.order === ASC ? DESC : ASC,
//       sort: p,
//     });
//   };

//   const handleSyncList = () => {
//     // sortEntities();
//     getAllEntities();
//   };

//   const getSortIconByFieldName = (fieldName: string) => {
//     const sortFieldName = sortState.sort;
//     const order = sortState.order;
//     if (sortFieldName !== fieldName) {
//       return faSort;
//     } else {
//       return order === ASC ? faSortUp : faSortDown;
//     }
//   };
//   // const publicRooms = roomList.filter(room => !room.isPrivate).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   // const privateRooms = roomList.filter(room => room.isPrivate).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   const publicRooms = roomList.filter(room => !room.isPrivate);
//   const privateRooms = roomList.filter(room => room.isPrivate);

//   const handleCreateRoom = () => {
//     setCreating(true);

//     const roomData = {
//       name: `Room ${Math.floor(Math.random() * 1000)}`, // Tên room ngẫu nhiên
//       isPrivate: false,
//       createdAt: dayjs(new Date()),
//     };
//     // dispatch(createRoom(roomData))
//     //   .unwrap()
//     //   .then(response => {
//     //     setNewRoom(response);
//     //     handleSyncList(); // Cập nhật danh sách room
//     //   })
//     //   .finally(() => setCreating(false));
//     dispatch(createRoom(roomData))
//       .unwrap()
//       .then(response => {
//         setNewRoom(response);
//         onCreateRoomMember(response);
//         handleSyncList(); // Cập nhật danh sách room
//       })
//       .finally(() => setCreating(false));
//   };

//   const roomMemberData = {
//     name: `Member  ${Math.floor(Math.random() * 1000)}`,
//     joinedAt: dayjs(new Date()),
//     roommember: currentUser
//   };
//   const onCreateRoomMember = () => {
//     setCreatingRoommember(true);
//     dispatch(createRoommember({ ...roomMemberData }))
//       .unwrap()
//       .then(response => {
//         setNewRoommember(response);
//         // handleSyncList();
//       })
//       .finally(() => setCreatingRoommember(false));
//   };
//   return (
//     <div>
//       <h2 id="room-heading" data-cy="RoomHeading">
//         <Translate contentKey="seaportApp.room.home.title">Rooms</Translate>
//         <div className="d-flex justify-content-end">
//           <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
//             <FontAwesomeIcon icon="sync" spin={loading} />{' '}
//             <Translate contentKey="seaportApp.room.home.refreshListLabel">Refresh List</Translate>
//           </Button>
//           <Link
//             to="/messagepersonroomupdate/new"
//             className="btn btn-primary jh-create-entity"
//             id="jh-create-entity"
//             data-cy="entityCreateButton"
//           >
//             <FontAwesomeIcon icon="plus" />
//             &nbsp;
//             <Translate contentKey="seaportApp.room.home.createLabel">Create new Room</Translate>
//           </Link>
//         </div>
//         <Button color="primary" onClick={handleCreateRoom} disabled={creating}>
//           {creating ? (
//             <span>
//               <FontAwesomeIcon icon="spinner" spin /> <Translate contentKey="global.messages.info.loading">Loading...</Translate>
//             </span>
//           ) : (
//             <span>
//               <FontAwesomeIcon icon="plus" /> <Translate contentKey="seaportApp.room.home.createLabel">Create Room</Translate>
//             </span>
//           )}
//         </Button>
//       </h2>
//       {/* Danh sách room public */}
//       <h3>
//         <Translate contentKey="seaportApp.room.publicRooms">Public Rooms</Translate>
//       </h3>
//       <div className="table-responsive">
//         {publicRooms.length > 0 ? (
//           <Table responsive>
//             <thead>
//               <tr>
//                 <th className="hand" onClick={sort('name')}>
//                   <Translate contentKey="seaportApp.room.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
//                 </th>
//                 <th className="hand" onClick={sort('createdAt')}>
//                   <Translate contentKey="seaportApp.room.createdAt">Created At</Translate>{' '}
//                   <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {publicRooms.map((room, i) => (
//                 <tr key={`entity-${i}`} data-cy="entityTable">
//                   <td>
//                     <Button tag={Link} to={`/room/${room.id}`} color="link" size="sm">
//                       {room.name}
//                     </Button>
//                     <button onClick={() => onCreateRoomMember(room)} style={{ marginLeft: '10px' }}>
//                       Tạo Room Member
//                     </button>
//                   </td>
//                   <td>{room.createdAt ? <TextFormat type="date" value={room.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         ) : (
//           !loading && (
//             <div className="alert alert-warning">
//               <Translate contentKey="seaportApp.room.home.notFound">No Public Rooms found</Translate>
//             </div>
//           )
//         )}
//       </div>

//       {/* Danh sách room private */}
//       <h3>
//         <Translate contentKey="seaportApp.room.privateRooms">Private Rooms</Translate>
//       </h3>
//       <div className="table-responsive">
//         {privateRooms.length > 0 ? (
//           <Table responsive>
//             <thead>
//               <tr>
//                 <th className="hand" onClick={sort('name')}>
//                   <Translate contentKey="seaportApp.room.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
//                 </th>
//                 <th className="hand" onClick={sort('createdAt')}>
//                   <Translate contentKey="seaportApp.room.createdAt">Created At</Translate>{' '}
//                   <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {privateRooms.map((room, i) => (
//                 <tr key={`entity-${i}`} data-cy="entityTable">
//                   <td>
//                     <Button tag={Link} to={`/room/${room.id}`} color="link" size="sm">
//                       {room.name}
//                     </Button>
//                   </td>
//                   <td>{room.createdAt ? <TextFormat type="date" value={room.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         ) : (
//           !loading && (
//             <div className="alert alert-warning">
//               <Translate contentKey="seaportApp.room.home.notFound">No Private Rooms found</Translate>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessagePerson;
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, ValidatedField, ValidatedForm, ValidatedBlobField, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getAllRoomMember } from 'app/entities/room-member/room-member.reducer';
import { createEntity as createMessage, getEntities as getAllMessage } from 'app/entities/message/message.reducer';
import './MessagePersonRoomMember.css';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';
export const MessagePersonRoomMember = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const roomMemberList = useAppSelector(state => state.roomMember.entities);
  const loading = useAppSelector(state => state.roomMember.loading);

  const getAllEntities = () => {
    dispatch(
      getAllRoomMember({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
    dispatch(
      getAllMessage({
        sort: `createdAt,${sortState.order}`,
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

  ////////////////////////////

  const messageList = useAppSelector(state => state.message.entities);
  const loadingmessageList = useAppSelector(state => state.message.loading);

  ///////////////////////////

  const messageEntity = useAppSelector(state => state.message.entity);
  const messageloading = useAppSelector(state => state.message.loading);
  const messageupdating = useAppSelector(state => state.message.updating);
  const messageupdateSuccess = useAppSelector(state => state.message.updateSuccess);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.createdAt = convertDateTimeToServer(values.createdAt);

    const entity = {
      // ...messageEntity,
      ...values,
      // sender: roomMembers.find(it => it.id.toString() === values.sender?.toString()),
      // message: rooms.find(it => it.id.toString() === values.message?.toString()),
    };

    // if (isNew) {
    dispatch(createMessage(entity));
    // } else {
    // dispatch(updateEntity(entity));
    // }
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
              <Link to="/room-member/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
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
                    <th className="hand" onClick={sort('joinedAt')}>
                      <Translate contentKey="seaportApp.roomMember.joinedAt">Joined At</Translate>{' '}
                      <FontAwesomeIcon icon={getSortIconByFieldName('joinedAt')} />
                    </th>
                    <th>
                      <Translate contentKey="seaportApp.roomMember.roommember">Roommember</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="seaportApp.roomMember.room">Room</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {roomMemberList.map((roomMember, i) => (
                    <tr key={`entity-${i}`} data-cy="entityTable">
                      <td>
                        <Button tag={Link} to={`/room-member/${roomMember.id}`} color="link" size="sm">
                          {roomMember.id}
                        </Button>
                      </td>
                      <td>{roomMember.name}</td>
                      <td>
                        {roomMember.joinedAt ? <TextFormat type="date" value={roomMember.joinedAt} format={APP_DATE_FORMAT} /> : null}
                      </td>
                      <td>{roomMember.roommember ? roomMember.roommember.login : ''}</td>
                      <td>{roomMember.room ? <Link to={`/room/${roomMember.room.id}`}>{roomMember.room.name}</Link> : ''}</td>
                      <td className="text-end">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`/room-member/${roomMember.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`/room-member/${roomMember.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
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
        <div>
          <div className="MessagePersonRoomMember1-messagelist">
            <h2 id="message-heading" data-cy="MessageHeading">
              <Translate contentKey="seaportApp.message.home.title">Messages</Translate>
              <div className="d-flex justify-content-end">
                <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
                  <FontAwesomeIcon icon="sync" spin={loading} />{' '}
                  <Translate contentKey="seaportApp.message.home.refreshListLabel">Refresh List</Translate>
                </Button>
                <Link to="/message/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
                  <FontAwesomeIcon icon="plus" />
                  &nbsp;
                  <Translate contentKey="seaportApp.message.home.createLabel">Create new Message</Translate>
                </Link>
              </div>
            </h2>
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
                      <th className="hand" onClick={sort('image')}>
                        <Translate contentKey="seaportApp.message.image">Image</Translate>{' '}
                        <FontAwesomeIcon icon={getSortIconByFieldName('image')} />
                      </th>
                      <th className="hand" onClick={sort('isActive')}>
                        <Translate contentKey="seaportApp.message.isActive">Is Active</Translate>{' '}
                        <FontAwesomeIcon icon={getSortIconByFieldName('isActive')} />
                      </th>
                      <th className="hand" onClick={sort('createdAt')}>
                        <Translate contentKey="seaportApp.message.createdAt">Created At</Translate>{' '}
                        <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                      </th>
                      <th>
                        <Translate contentKey="seaportApp.message.sender">Sender</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="seaportApp.message.message">Message</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {messageList.map((message, i) => (
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td>
                          <Button tag={Link} to={`/message/${message.id}`} color="link" size="sm">
                            {message.id}
                          </Button>
                        </td>
                        <td>{message.content}</td>
                        <td>
                          {message.image ? (
                            <div>
                              {message.imageContentType ? (
                                // <a onClick={openFile(message.imageContentType, message.image)}>
                                <img src={`data:${message.imageContentType};base64,${message.image}`} style={{ maxHeight: '30px' }} />
                              ) : // &nbsp;
                              // </a>
                              null}
                              {/* <span> */}
                              {/* {message.imageContentType}, {byteSize(message.image)} */}
                              {/* </span> */}
                            </div>
                          ) : null}
                        </td>
                        <td>{message.isActive ? 'true' : 'false'}</td>
                        <td>{message.createdAt ? <TextFormat type="date" value={message.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                        <td>{message.sender ? <Link to={`/room-member/${message.sender.id}`}>{message.sender.name}</Link> : ''}</td>
                        <td>{message.message ? <Link to={`/room/${message.message.id}`}>{message.message.name}</Link> : ''}</td>
                        <td className="text-end">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`/message/${message.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`/message/${message.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              onClick={() => (window.location.href = `/message/${message.id}/delete`)}
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
                !loadingmessageList && (
                  <div className="alert alert-warning">
                    <Translate contentKey="seaportApp.message.home.notFound">No Messages found</Translate>
                  </div>
                )
              )}
            </div>
          </div>
          <div>
            <Row className="justify-content-center">
              <Col md="8">
                <h2 id="seaportApp.message.home.createOrEditLabel" data-cy="MessageCreateUpdateHeading">
                  <Translate contentKey="seaportApp.message.home.createOrEditLabel">Create or edit a Message</Translate>
                </h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="8">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ValidatedForm
                    // defaultValues={defaultValues()}
                    onSubmit={saveEntity}
                  >
                    {/* {!isNew ? (
                      <ValidatedField
                        name="id"
                        required
                        readOnly
                        id="message-id"
                        label={translate('global.field.id')}
                        validate={{ required: true }}
                      />
                    ) : null} */}
                    <ValidatedField
                      label={translate('seaportApp.message.content')}
                      id="message-content"
                      name="content"
                      data-cy="content"
                      type="textarea"
                    />
                    {/* <ValidatedBlobField
                      label={translate('seaportApp.message.image')}
                      id="message-image"
                      name="image"
                      data-cy="image"
                      isImage
                      accept="image/*"
                    /> */}
                    <ValidatedField
                      label={translate('seaportApp.message.isActive')}
                      id="message-isActive"
                      name="isActive"
                      data-cy="isActive"
                      check
                      type="checkbox"
                    />
                    <ValidatedField
                      label={translate('seaportApp.message.createdAt')}
                      id="message-createdAt"
                      name="createdAt"
                      data-cy="createdAt"
                      type="datetime-local"
                      placeholder="YYYY-MM-DD HH:mm"
                      validate={{
                        required: { value: true, message: translate('entity.validation.required') },
                      }}
                    />
                    {/* <ValidatedField
                      id="message-sender"
                      name="sender"
                      data-cy="sender"
                      label={translate('seaportApp.message.sender')}
                      type="select"
                    >
                      <option value="" key="0" />
                      {roomMembers
                        ? roomMembers.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                        : null}
                    </ValidatedField> */}
                    {/* <ValidatedField
                      id="message-message"
                      name="message"
                      data-cy="message"
                      label={translate('seaportApp.message.message')}
                      type="select"
                    >
                      <option value="" key="0" />
                      {rooms
                        ? rooms.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                        : null}
                    </ValidatedField> */}
                    <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/message" replace color="info">
                      <FontAwesomeIcon icon="arrow-left" />
                      &nbsp;
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.back">Back</Translate>
                      </span>
                    </Button>
                    &nbsp;
                    <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={messageupdating}>
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <Translate contentKey="entity.action.save">Save</Translate>
                    </Button>
                  </ValidatedForm>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePersonRoomMember;
