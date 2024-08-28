// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Button, Row, Col, FormText } from 'reactstrap';
// import {
//   isNumber,
//   Translate,
//   translate,
//   ValidatedField,
//   ValidatedForm,
//   ValidatedBlobField,
// } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import {
//   convertDateTimeFromServer,
//   convertDateTimeToServer,
//   displayDefaultDateTime,
// } from 'app/shared/util/date-utils';
// import { mapIdList } from 'app/shared/util/entity-utils';
// import { useAppDispatch, useAppSelector } from 'app/config/store';

// import { IUser } from 'app/shared/model/user.model';
// import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
// import { IDepartment } from 'app/shared/model/department.model';
// import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
// import { IPerson } from 'app/shared/model/person.model';
// // import { getEntity, updateEntity, createEntity, reset } from './person.reducer';
// import PersonForm from 'app/component/person-edit/person-form';
// import {
//   reset,
//   getEntity,
//   updateEntity,
//   createEntity,
// } from 'app/entities/person/person.reducer';

// export const PersonUpdatePage = () => {
//   const dispatch = useAppDispatch();

//   const navigate = useNavigate();

//   const { id } = useParams<'id'>();
//   const isNew = id === undefined;

//   const users = useAppSelector(state => state.userManagement.users);
//   const departments = useAppSelector(state => state.department.entities);
//   const personEntity = useAppSelector(state => state.person.entity);
//   const loading = useAppSelector(state => state.person.loading);
//   const updating = useAppSelector(state => state.person.updating);
//   const updateSuccess = useAppSelector(state => state.person.updateSuccess);

//   const handleClose = () => {
//     // navigate('/person');
//   };

//   useEffect(() => {
//     if (isNew) {
//       dispatch(reset());
//     } else {
//       dispatch(getEntity(id));
//     }

//     dispatch(getUsers({}));
//     dispatch(getDepartments({}));
//   }, []);

//   useEffect(() => {
//     if (updateSuccess) {
//       handleClose();
//     }
//   }, [updateSuccess]);

//   // eslint-disable-next-line complexity
//   const saveEntity = values => {
//     if (values.id !== undefined && typeof values.id !== 'number') {
//       values.id = Number(values.id);
//     }
//     values.createdAt = convertDateTimeToServer(values.createdAt);
//     values.updateAt = convertDateTimeToServer(values.updateAt);
//     values.dateOfBirth = convertDateTimeToServer(values.dateOfBirth);

//     const entity = {
//       ...personEntity,
//       ...values,
//       user: users.find(it => it.id.toString() === values.user?.toString()),
//       department: departments.find(
//         it => it.id.toString() === values.department?.toString(),
//       ),
//     };

//     if (isNew) {
//       dispatch(createEntity(entity));
//     } else {
//       dispatch(updateEntity(entity));
//     }
//   };

//   const defaultValues = () =>
//     isNew
//       ? {
//           createdAt: displayDefaultDateTime(),
//           updateAt: displayDefaultDateTime(),
//           dateOfBirth: displayDefaultDateTime(),
//         }
//       : {
//           ...personEntity,
//           createdAt: convertDateTimeFromServer(personEntity.createdAt),
//           updateAt: convertDateTimeFromServer(personEntity.updateAt),
//           dateOfBirth: convertDateTimeFromServer(personEntity.dateOfBirth),
//           user: personEntity?.user?.id,
//           department: personEntity?.department?.id,
//         };

//   return (
//     <PersonForm
//       isNew={isNew}
//       users={users}
//       departments={departments}
//       personEntity={personEntity}
//       loading={loading}
//       updating={updating}
//       defaultValues={defaultValues()}
//       saveEntity={saveEntity}
//     />
//   );
// };

// export default PersonUpdatePage;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IPerson } from 'app/shared/model/person.model';
import PersonForm from 'app/component/person-edit/person-form';
import { reset, getEntity, updateEntity, createEntity } from 'app/entities/person/person.reducer';
import { unwrapResult } from '@reduxjs/toolkit';

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
  const currentUser = useAppSelector(state => state.authentication.account);

  const handleClose = () => {
    // window.location.reload();
    // navigate('/');
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
  const saveEntity = async values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updateAt = convertDateTimeToServer(values.updateAt);
    values.dateOfBirth = convertDateTimeToServer(values.dateOfBirth);

    const entity = {
      ...personEntity,
      ...values,
      user: currentUser,
      department: departments.find(it => it.id.toString() === values.department?.toString()),
      isAuthor: false,
    };

    if (isNew) {
      // dispatch(createEntity(entity));
      const actionResult = await dispatch(createEntity(entity));
      const result = unwrapResult(actionResult);
      navigate(`/personalpage/${result.data.id}`);
    } else {
      dispatch(updateEntity(entity));
      // const actionResult = await dispatch(updateEntity(entity));
      // const result = unwrapResult(actionResult);
      // navigate(`/personalpage/${result.data.id}`);
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          createdAt: new Date().toISOString(),
          updateAt: new Date().toISOString(),
          dateOfBirth: new Date().toISOString(),
        }
      : {
          ...personEntity,
          createdAt: convertDateTimeFromServer(personEntity.createdAt),
          updateAt: new Date().toISOString(),
          dateOfBirth: convertDateTimeFromServer(personEntity.dateOfBirth),
          user: personEntity?.user?.id,
          department: personEntity?.department?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="seaportApp.person.home.createOrEditLabel" data-cy="PersonCreateUpdateHeading">
            <Translate contentKey="seaportApp.person.home.createOrEditLabel">Create or edit a Person</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {/* {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="person-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null} */}
              <ValidatedField
                label={translate('seaportApp.person.name')}
                id="person-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: {
                    value: true,
                    message: translate('entity.validation.required'),
                  },
                }}
              />
              <ValidatedBlobField
                label={translate('seaportApp.person.avatar')}
                id="person-avatar"
                name="avatar"
                data-cy="avatar"
                isImage
                accept="image/*"
                validate={{
                  required: {
                    value: true,
                    message: translate('entity.validation.required'),
                  },
                }}
              />
              <ValidatedBlobField
                label={translate('seaportApp.person.cover')}
                id="person-cover"
                name="cover"
                data-cy="cover"
                isImage
                accept="image/*"
                validate={{
                  required: {
                    value: true,
                    message: translate('entity.validation.required'),
                  },
                }}
              />
              <ValidatedField label={translate('seaportApp.person.bio')} id="person-bio" name="bio" data-cy="bio" type="textarea" />
              <ValidatedField
                label={translate('seaportApp.person.phone')}
                id="person-phone"
                name="phone"
                data-cy="phone"
                type="text"
                validate={{
                  minLength: {
                    value: 12,
                    message: translate('entity.validation.minlength', {
                      min: 12,
                    }),
                  },
                  maxLength: {
                    value: 12,
                    message: translate('entity.validation.maxlength', {
                      max: 12,
                    }),
                  },
                }}
              />
              <ValidatedField
                label={translate('seaportApp.person.country')}
                id="person-country"
                name="country"
                data-cy="country"
                type="text"
              />
              <ValidatedField
                label={translate('seaportApp.person.address')}
                id="person-address"
                name="address"
                data-cy="address"
                type="text"
              />
              {/* <ValidatedField
                label={translate('seaportApp.person.createdAt')}
                id="person-createdAt"
                name="createdAt"
                data-cy="createdAt"
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
                label={translate('seaportApp.person.updateAt')}
                id="person-updateAt"
                name="updateAt"
                data-cy="updateAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: {
                    value: true,
                    message: translate('entity.validation.required'),
                  },
                }}
              /> */}
              <ValidatedField
                label={translate('seaportApp.person.dateOfBirth')}
                id="person-dateOfBirth"
                name="dateOfBirth"
                data-cy="dateOfBirth"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              {/* <ValidatedField
                label={translate('seaportApp.person.isAuthor')}
                id="person-isAuthor"
                name="isAuthor"
                data-cy="isAuthor"
                check
                type="checkbox"
              /> */}
              {/* <ValidatedField
                id="person-user"
                name="user"
                data-cy="user"
                label={translate('seaportApp.person.user')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField> */}
              <ValidatedField
                id="person-department"
                name="department"
                data-cy="department"
                label={translate('seaportApp.person.department')}
                type="select"
              >
                <option value="" key="0" />
                {departments
                  ? departments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/" replace color="info">
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
  // return (
  //   <PersonForm
  //     isNew={isNew}
  //     users={users}
  //     departments={departments}
  //     personEntity={personEntity}
  //     loading={loading}
  //     updating={updating}
  //     defaultValues={defaultValues()}
  //     saveEntity={saveEntity}
  //   />
  // );
};

export default PersonUpdatePage;
