import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, TextFormat } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { deleteEntity, getEntity } from 'app/entities/room-member/room-member.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';

const RoomMemberTable = ({ roomMemberList, loading, sort, getSortIconByFieldName, handleRoomMemberClick, joinRoom, saveRoomPrivate }) => {
  const dispatch = useAppDispatch();
  const updateSuccess = useAppSelector(state => state.roomMember.updateSuccess);

  const [loadModal, setLoadModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoomMember, setSelectedRoomMember] = useState(null);

  const toggleModal = (roomMember = null) => {
    setSelectedRoomMember(roomMember);
    setModalOpen(!modalOpen);
  };
  const confirmDelete = () => {
    if (selectedRoomMember) {
      dispatch(deleteEntity(selectedRoomMember.id));
    }
  };
  useEffect(() => {
    if (updateSuccess && modalOpen) {
      setModalOpen(!modalOpen);
    }
  }, [updateSuccess]);
  return (
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
        </div>
      </h2>
      <div className="table-responsive">
        {roomMemberList && roomMemberList.length > 0 ? (
          <Table responsive>
            <tbody>
              {roomMemberList.map((roomMember, i) => (
                <tr
                  key={`roomMember-${i}`}
                  data-cy="entityTable"
                  onClick={() => handleRoomMemberClick(roomMember, roomMember.roommember.id, roomMember.room.id)}
                >
                  <div className="RoomMemberTable-person">
                    {roomMember.listRoommemberDTO
                      ? roomMember.listRoommemberDTO.map((list, i) => (
                          <div className="MessageListTable-image">
                            {list.personDTO ? (
                              list.personDTO.avatarContentType ? (
                                <img src={`data:${list.personDTO.avatarContentType};base64,${list.personDTO.avatar}`} />
                              ) : null
                            ) : (
                              list.roommember.login
                            )}
                          </div>
                        ))
                      : null}
                  </div>
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
                        // onClick={() => (window.location.href = `/room-member/${roomMember.id}/delete`)}
                        onClick={() => toggleModal(roomMember)}
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
      <Modal
        isOpen={modalOpen}
        // toggle={handleClose}
      >
        <ModalHeader toggle={toggleModal} data-cy="roomMemberDeleteDialogHeading">
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="seaportApp.roomMember.delete.question">
          <Translate contentKey="seaportApp.roomMember.delete.question" interpolate={{ id: selectedRoomMember?.id }}>
            Are you sure you want to delete this RoomMember?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-roomMember" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RoomMemberTable;
