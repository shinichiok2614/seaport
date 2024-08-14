import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import {
  Translate,
  openFile,
  byteSize,
  TextFormat,
  ValidatedForm,
  ValidatedField,
  translate,
  ValidatedBlobField,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import PostPageView from 'app/component/post-page-view/post-page-view';
import { getEntity, getEntityByPerson } from 'app/entities/post/post.reducer';
import { getEntitiesByPost } from 'app/entities/paragraph/paragraph.reducer';
import { ParagraphViewEachPostPage } from 'app/component/paragraph-view-each-postpage/paragraph-view-each-postpage';
import CommentList from 'app/component/comment-list/comment-list';
import { PostPageViewCenter } from 'app/component/post-page-view-center/post-page-view-center';
import PostPageViewSummary from 'app/component/post-page-view-summary/post-page-view-summary';
import CommentListView from 'app/component/comment-list-view/comment-list-view';
import {
  getEntitiesByPost as getComments,
  createEntity as createComment,
  reset,
  updateEntity as updateComment,
} from 'app/entities/comment/comment.reducer';

import './PostViewPage.css';
import {
  convertDateTimeToServer,
  displayDefaultDateTime,
} from 'app/shared/util/date-utils';
import CommentForm from './comment-form';

export const PostViewPage = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const isNew = undefined;

  const paragraphList = useAppSelector(state => state.paragraph.entities);
  const paragraphloading = useAppSelector(state => state.paragraph.loading);

  const commentList = useAppSelector(state => state.comment.entities);
  const commentListloading = useAppSelector(state => state.comment.loading);
  const commentEntity = useAppSelector(state => state.comment.entity);
  const commentloading = useAppSelector(state => state.comment.loading);
  const commentupdating = useAppSelector(state => state.comment.updating);
  const commentupdateSuccess = useAppSelector(
    state => state.comment.updateSuccess,
  );

  const postEntity = useAppSelector(state => state.post.entity);
  const postloading = useAppSelector(state => state.post.loading);
  const currentUser = useAppSelector(state => state.authentication.account);

  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    dispatch(getEntityByPerson(id));
    dispatch(getEntitiesByPost(id));
    dispatch(getComments(id));
  }, [id, dispatch]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.createdAt = new Date().toISOString();
    values.updateAt = new Date().toISOString();

    const entity = {
      ...commentEntity,
      ...values,
      post: postEntity,
      comment: currentUser,
    };

    // if (isNew) {
    dispatch(createComment(entity));
    // } else {
    // dispatch(updateComment(entity));
    // }
  };
  useEffect(() => {
    if (commentupdateSuccess) {
      dispatch(getComments(id));
      dispatch(reset());
    }
  }, [commentupdateSuccess]);
  const defaultValues = () =>
    isNew
      ? {
          createdAt: new Date().toISOString(),
          updateAt: new Date().toISOString(),
        }
      : {
          ...commentEntity,
          createdAt: new Date().toISOString(),
          updateAt: new Date().toISOString(),
          post: postEntity,
          comment: currentUser,
        };
  return (
    <div className="PostViewPage">
      <div className="PostViewPage1">
        <PostPageViewSummary postEntity={postEntity}></PostPageViewSummary>
      </div>
      <div className="PostViewPage2">
        <PostPageViewCenter
          postEntity={postEntity}
          paragraphList={paragraphList}
        ></PostPageViewCenter>
        <div className="PostViewPage2-comment">Comments: </div>
        <CommentListView
          commentList={commentList}
          loading={commentListloading}
        />
        {/* <div className="PostViewPage22">
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
            <Button
              color="primary"
              id="save-entity"
              data-cy="entityCreateSaveButton"
              type="submit"
              disabled={commentupdating}
            >
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ValidatedForm>
        </div> */}
        <CommentForm
          defaultValues={defaultValues}
          saveEntity={saveEntity}
          commentupdating={commentupdating}
        />
      </div>
      <div className="PostViewPage3">right</div>
    </div>
  );
};

export default PostViewPage;
