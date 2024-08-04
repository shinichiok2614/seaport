import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { displayDefaultDateTime } from 'app/shared/util/date-utils';

const PersonForm = ({ isNew, users, departments, personEntity, loading, updating, defaultValues, saveEntity }) => {
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
            <ValidatedForm defaultValues={defaultValues} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="person-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('seaportApp.person.name')}
                id="person-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
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
                  required: { value: true, message: translate('entity.validation.required') },
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
                  required: { value: true, message: translate('entity.validation.required') },
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
                  minLength: { value: 12, message: translate('entity.validation.minlength', { min: 12 }) },
                  maxLength: { value: 12, message: translate('entity.validation.maxlength', { max: 12 }) },
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
              <ValidatedField
                label={translate('seaportApp.person.createdAt')}
                id="person-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
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
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('seaportApp.person.dateOfBirth')}
                id="person-dateOfBirth"
                name="dateOfBirth"
                data-cy="dateOfBirth"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('seaportApp.person.isAuthor')}
                id="person-isAuthor"
                name="isAuthor"
                data-cy="isAuthor"
                check
                type="checkbox"
              />
              <ValidatedField id="person-user" name="user" data-cy="user" label={translate('seaportApp.person.user')} type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/person" replace color="info">
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

export default PersonForm;
