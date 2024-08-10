import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
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
import { getEntitiesByPost as getComments } from 'app/entities/comment/comment.reducer';

import './PostViewPage.css';

export const PostViewPage = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();
  const paragraphList = useAppSelector(state => state.paragraph.entities);
  const paragraphloading = useAppSelector(state => state.paragraph.loading);
  const commentList = useAppSelector(state => state.comment.entities);
  const commentListloading = useAppSelector(state => state.comment.loading);
  const postEntity = useAppSelector(state => state.post.entity);
  const postloading = useAppSelector(state => state.post.loading);

  useEffect(() => {
    dispatch(getEntityByPerson(id));
    dispatch(getEntitiesByPost(id));
    dispatch(getComments(id));
  }, [id, dispatch]);

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
      </div>
      <div className="PostViewPage3">right</div>
      <div>{postEntity.id}</div>
    </div>
  );
};

export default PostViewPage;
