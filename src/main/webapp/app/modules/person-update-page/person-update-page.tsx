import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import {
  isNumber,
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  ValidatedBlobField,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IPerson } from 'app/shared/model/person.model';
// import { getEntity, updateEntity, createEntity, reset } from './person.reducer';
import PersonForm from 'app/component/person-edit/person-form';
import {
  reset,
  getEntity,
  updateEntity,
  createEntity,
} from 'app/entities/person/person.reducer';

export const PersonUpdatePage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const departments = useAppSelector(state => state.department.entities);
  const personEntity = useAppSelector(state => state.person.entity);
  const loading = useAppSelector(state => state.person.loading);
  const updating = useAppSelector(state => state.person.updating);
  const updateSuccess = useAppSelector(state => state.person.updateSuccess);

  const handleClose = () => {
    // navigate('/person');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getDepartments({}));
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
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updateAt = convertDateTimeToServer(values.updateAt);
    values.dateOfBirth = convertDateTimeToServer(values.dateOfBirth);

    const entity = {
      ...personEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
      department: departments.find(
        it => it.id.toString() === values.department?.toString(),
      ),
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
          createdAt: displayDefaultDateTime(),
          updateAt: displayDefaultDateTime(),
          dateOfBirth: displayDefaultDateTime(),
        }
      : {
          ...personEntity,
          createdAt: convertDateTimeFromServer(personEntity.createdAt),
          updateAt: convertDateTimeFromServer(personEntity.updateAt),
          dateOfBirth: convertDateTimeFromServer(personEntity.dateOfBirth),
          user: personEntity?.user?.id,
          department: personEntity?.department?.id,
        };

  return (
    <PersonForm
      isNew={isNew}
      users={users}
      departments={departments}
      personEntity={personEntity}
      loading={loading}
      updating={updating}
      defaultValues={defaultValues()}
      saveEntity={saveEntity}
    />
  );
};

export default PersonUpdatePage;
