import React from 'react';
import PostCardViewMedium from '../post-card-view-medium/post-card-view-medium';
import { Translate } from 'react-jhipster';
import PostCardView from '../post-card-view/post-card-view';
import './PostListViewEach.css';

const PostListViewEach = ({ postList }) => {
  return (
    <div className="post-list-container">
      {postList && postList.length > 0 ? (
        <>
          <div className="row1">
            {postList.slice(0, 1).map((post, i) => (
              <PostCardViewMedium key={`entity-${i}`} post={post} hideImage={true} hidePersonAvatar={false} />
            ))}
            {postList.slice(1, 3).map((post, i) => (
              <PostCardViewMedium key={`entity-${i}`} post={post} />
            ))}
            {postList.slice(3, 4).map((post, i) => (
              <PostCardViewMedium key={`entity-${i}`} post={post} hideImage={true} hidePersonAvatar={false} />
            ))}
          </div>
          <div className="row2">
            {postList.slice(4, 8).map((post, i) => (
              <PostCardViewMedium key={`entity-${i}`} post={post} hideImage={true} hidePersonAvatar={false} />
            ))}
          </div>
          <div className="row3">
            {postList.slice(8).map((post, i) => (
              <PostCardView key={`entity-${i}`} post={post} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <Translate contentKey="seaportApp.post.home.notFound">No Posts found</Translate>
        </div>
      )}
    </div>
  );
};

export default PostListViewEach;
