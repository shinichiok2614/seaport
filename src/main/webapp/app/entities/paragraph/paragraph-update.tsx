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

import { IPost } from 'app/shared/model/post.model';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { IParagraph } from 'app/shared/model/paragraph.model';
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from './paragraph.reducer';

export const ParagraphUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const posts = useAppSelector(state => state.post.entities);
  const paragraphEntity = useAppSelector(state => state.paragraph.entity);
  const loading = useAppSelector(state => state.paragraph.loading);
  const updating = useAppSelector(state => state.paragraph.updating);
  const updateSuccess = useAppSelector(state => state.paragraph.updateSuccess);

  const handleClose = () => {
    navigate('/paragraph');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPosts({}));
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
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    const entity = {
      ...paragraphEntity,
      ...values,
      paragraph: posts.find(
        it => it.id.toString() === values.paragraph?.toString(),
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
          updatedAt: displayDefaultDateTime(),
        }
      : {
          ...paragraphEntity,
          createdAt: convertDateTimeFromServer(paragraphEntity.createdAt),
          updatedAt: convertDateTimeFromServer(paragraphEntity.updatedAt),
          paragraph: paragraphEntity?.paragraph?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="seaportApp.paragraph.home.createOrEditLabel"
            data-cy="ParagraphCreateUpdateHeading"
          >
            <Translate contentKey="seaportApp.paragraph.home.createOrEditLabel">
              Create or edit a Paragraph
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm
              defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="paragraph-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedBlobField
                label={translate('seaportApp.paragraph.image')}
                id="paragraph-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('seaportApp.paragraph.caption')}
                id="paragraph-caption"
                name="caption"
                data-cy="caption"
                type="text"
              />
              <ValidatedField
                label={translate('seaportApp.paragraph.content')}
                id="paragraph-content"
                name="content"
                data-cy="content"
                type="textarea"
              />
              <ValidatedField
                label={translate('seaportApp.paragraph.contentType')}
                id="paragraph-contentType"
                name="contentType"
                data-cy="contentType"
                type="text"
              />
              <ValidatedField
                label={translate('seaportApp.paragraph.createdAt')}
                id="paragraph-createdAt"
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
                label={translate('seaportApp.paragraph.updatedAt')}
                id="paragraph-updatedAt"
                name="updatedAt"
                data-cy="updatedAt"
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
                id="paragraph-paragraph"
                name="paragraph"
                data-cy="paragraph"
                label={translate('seaportApp.paragraph.paragraph')}
                type="select"
              >
                <option value="" key="0" />
                {posts
                  ? posts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button
                tag={Link}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/paragraph"
                replace
                color="info"
              >
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button
                color="primary"
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="submit"
                disabled={updating}
              >
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

export default ParagraphUpdate;
