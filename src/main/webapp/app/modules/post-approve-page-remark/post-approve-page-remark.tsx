import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Input } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import PostPageView from 'app/component/post-page-view/post-page-view';
import {
  getEntity,
  getEntityByPerson,
  updateEntity,
} from 'app/entities/post/post.reducer';
import { getEntitiesByPost } from 'app/entities/paragraph/paragraph.reducer';
import { ParagraphViewEachPostPage } from 'app/component/paragraph-view-each-postpage/paragraph-view-each-postpage';
import CommentList from 'app/component/comment-list/comment-list';
import { PostPageViewCenter } from 'app/component/post-page-view-center/post-page-view-center';
import PostPageViewSummary from 'app/component/post-page-view-summary/post-page-view-summary';
import CommentListView from 'app/component/comment-list-view/comment-list-view';
import { getEntitiesByPost as getComments } from 'app/entities/comment/comment.reducer';

import './PostApprovePageRemark.css';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';

export const formatCurrentDateTime = () => {
  return new Date().toISOString(); // ISO 8601 format: "yyyy-MM-ddTHH:mm:ss.SSSZ"
};

export const PostApprovePageRemark = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const paragraphList = useAppSelector(state => state.paragraph.entities);
  const paragraphloading = useAppSelector(state => state.paragraph.loading);
  const commentList = useAppSelector(state => state.comment.entities);
  const commentListloading = useAppSelector(state => state.comment.loading);
  const postEntity = useAppSelector(state => state.post.entity);
  const postloading = useAppSelector(state => state.post.loading);

  const [remark, setRemark] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(getEntityByPerson(id));
    dispatch(getEntitiesByPost(id));
    dispatch(getComments(id));
  }, [id, dispatch]);

  // useEffect(() => {
  //   if (postEntity.remark) {
  //     setRemark(postEntity.remark); // Cập nhật giá trị mặc định cho remark từ postEntity
  //   }
  // }, []);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     if (remark !== postEntity.remark) {
  //       const updatedPost = {
  //         ...postEntity,
  //         remark,
  //         post: postEntity.person.user,
  //       };
  //       dispatch(updateEntity(updatedPost));
  //       setStatus('Đã lưu');
  //     }
  //   }, 2000); // 2000 ms = 2 giây

  //   if (remark !== postEntity.remark) {
  //     setStatus('Đang lưu...');
  //   }
  //   // Cleanup timeout nếu người dùng tiếp tục gõ trước khi hết 2 giây
  //   return () => clearTimeout(handler);
  // }, [remark, postEntity, dispatch]);

  const handleApprove = () => {
    const currentDateTime = formatCurrentDateTime();
    const updatedPost = {
      ...postEntity,
      status: 'APPROVED',
      remark,
      approvedAt: currentDateTime,
      post: postEntity.person.user,
    };
    dispatch(updateEntity(updatedPost));
  };

  const handleCancel = () => {
    const currentDateTime = formatCurrentDateTime();
    const updatedPost = {
      ...postEntity,
      status: 'CANCELLED',
      remark,
      approvedAt: currentDateTime,
      post: postEntity.person.user,
    };
    dispatch(updateEntity(updatedPost));
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
      </div>
      <div className="PostViewPage3">
        <Input
          type="textarea"
          placeholder="Enter remark"
          value={remark}
          onChange={e => setRemark(e.target.value)}
        />
        {postEntity.status === 'PENDING' && (
          <>
            <Button color="success" onClick={handleApprove}>
              Approve
            </Button>{' '}
            <Button color="danger" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
        {postEntity.status === 'APPROVED' && (
          <>
            <Button color="danger" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
        {postEntity.status === 'CANCELLED' && (
          <>
            <Button color="success" onClick={handleApprove}>
              Approve
            </Button>
          </>
        )}
        {/* <div className="status-message">{status}</div> */}
      </div>
    </div>
  );
};

export default PostApprovePageRemark;
