import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  ValidatedBlobField,
} from 'react-jhipster';
import { useAppSelector } from 'app/config/store';
import { IPost } from 'app/shared/model/post.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IPostFormProps {
  isNew: boolean;
  saveEntity: (values: any) => void;
  updating: boolean;
  defaultValues: () => Partial<IPost>;
  loading: boolean; // Thêm loading
}

const PostForm: React.FC<IPostFormProps> = ({
  isNew,
  saveEntity,
  updating,
  defaultValues,
  loading,
}) => {
  const categories = useAppSelector(state => state.category.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const statusValues = Object.keys(Status);

  return (
    <Row className="justify-content-center">
      <Col md="8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
            <ValidatedField
              id="post-category"
              name="category"
              data-cy="category"
              label={translate('seaportApp.post.category')}
              type="select"
            >
              <option value="" key="0" />
              {categories
                ? categories.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.name}
                    </option>
                  ))
                : null}
            </ValidatedField>
            <ValidatedField
              label={translate('seaportApp.post.name')}
              id="post-name"
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
            <ValidatedField
              label={translate('seaportApp.post.summary')}
              id="post-summary"
              name="summary"
              data-cy="summary"
              type="textarea"
              validate={{
                required: {
                  value: true,
                  message: translate('entity.validation.required'),
                },
              }}
            />
            <ValidatedBlobField
              label={translate('seaportApp.post.image')}
              id="post-image"
              name="image"
              data-cy="image"
              isImage
              accept="image/*"
              validate={{
                required: {
                  value: true,
                  message: translate('entity.validation.required'),
                },
              }}
            />
            <ValidatedField
              label={translate('seaportApp.post.status')}
              id="post-status"
              name="status"
              data-cy="status"
              type="select"
              defaultValue={statusValues[1]}
              disabled
            >
              {statusValues.map(status => (
                <option value={status} key={status}>
                  {translate('seaportApp.Status.' + status)}
                </option>
              ))}
            </ValidatedField>
            <div className="PostEditPage-create-update">
              <ValidatedField
                label={translate('seaportApp.post.createdAt')}
                id="post-createdAt"
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
                disabled
              />
              <ValidatedField
                label={translate('seaportApp.post.updateAt')}
                id="post-updateAt"
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
                disabled
              />
            </div>
            <ValidatedField
              id="post-post"
              name="post"
              data-cy="post"
              label={translate('seaportApp.post.post')}
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
            <Button
              tag={Link}
              id="cancel-save"
              data-cy="entityCreateCancelButton"
              to="/post"
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
  );
};

export default PostForm;
