import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IRoom } from 'app/shared/model/room.model';
import { getEntities as getRooms } from 'app/entities/room/room.reducer';
import { IRoomMember } from 'app/shared/model/room-member.model';
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/room-member/room-member.reducer';

export const MessagePersonRoomMemberInvite = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = true;

  const users = useAppSelector(state => state.userManagement.users);
  const rooms = useAppSelector(state => state.room.entities);
  const roomMemberEntity = useAppSelector(state => state.roomMember.entity);
  const loading = useAppSelector(state => state.roomMember.loading);
  const updating = useAppSelector(state => state.roomMember.updating);
  const updateSuccess = useAppSelector(state => state.roomMember.updateSuccess);

  const handleClose = () => {
    navigate('/messageperson');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      //   dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getRooms({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.joinedAt = convertDateTimeToServer(values.joinedAt);

    const entity = {
      ...roomMemberEntity,
      ...values,
      roommember: users.find(it => it.id.toString() === values.roommember?.toString()),
      room: rooms.find(it => it.id.toString() === id?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          joinedAt: displayDefaultDateTime(),
        }
      : {
          ...roomMemberEntity,
          joinedAt: convertDateTimeFromServer(roomMemberEntity.joinedAt),
          roommember: roomMemberEntity?.roommember?.id,
          room: roomMemberEntity?.room?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="seaportApp.roomMember.home.createOrEditLabel" data-cy="RoomMemberCreateUpdateHeading">
            <Translate contentKey="seaportApp.roomMember.home.createOrEditLabel">Create or edit a RoomMember</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="room-member-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('seaportApp.roomMember.name')}
                id="room-member-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('seaportApp.roomMember.joinedAt')}
                id="room-member-joinedAt"
                name="joinedAt"
                data-cy="joinedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: {
                    value: true,
                    message: translate('entity.validation.required'),
                  },
                }}
              />
              <ValidatedField
                id="room-member-roommember"
                name="roommember"
                data-cy="roommember"
                label={translate('seaportApp.roomMember.roommember')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              {/* <ValidatedField
                id="room-member-room"
                name="room"
                data-cy="room"
                label={translate('seaportApp.roomMember.room')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/room-member" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MessagePersonRoomMemberInvite;
