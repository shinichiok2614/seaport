import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import {
  deleteEntity,
  getEntity,
} from 'app/entities/paragraph/paragraph.reducer';
// import { getEntity, deleteEntity } from './paragraph.reducer';

export const ParagraphDelete = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const searchParams = new URLSearchParams(pageLocation.search);
  const postId = searchParams.get('postId');
  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const paragraphEntity = useAppSelector(state => state.paragraph.entity);
  const updateSuccess = useAppSelector(state => state.paragraph.updateSuccess);

  const handleClose = () => {
    navigate(`/paragrapheditpage/${postId}`);
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(paragraphEntity.id));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="paragraphDeleteDialogHeading">
        <Translate contentKey="entity.delete.title">
          Confirm delete operation
        </Translate>
      </ModalHeader>
      <ModalBody id="seaportApp.paragraph.delete.question">
        <Translate
          contentKey="seaportApp.paragraph.delete.question"
          interpolate={{ id: paragraphEntity.id }}
        >
          Are you sure you want to delete this Paragraph?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button
          id="jhi-confirm-delete-paragraph"
          data-cy="entityConfirmDeleteButton"
          color="danger"
          onClick={confirmDelete}
        >
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ParagraphDelete;
