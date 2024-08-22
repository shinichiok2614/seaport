import React from 'react';
import { Button } from 'reactstrap';
import { ValidatedForm, ValidatedField, ValidatedBlobField, translate, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentForm = ({ defaultValues, saveEntity, commentupdating }) => {
  return (
    <div className="PostViewPage22">
      <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
        <ValidatedField
          label={translate('seaportApp.comment.description')}
          id="comment-description"
          name="description"
          data-cy="description"
          type="textarea"
        />
        <ValidatedBlobField
          label={translate('seaportApp.comment.image')}
          id="comment-image"
          name="image"
          data-cy="image"
          isImage
          accept="image/*"
        />
        <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={commentupdating}>
          <FontAwesomeIcon icon="save" />
          &nbsp;
          <Translate contentKey="entity.action.save">Save</Translate>
        </Button>
      </ValidatedForm>
    </div>
  );
};

export default CommentForm;
