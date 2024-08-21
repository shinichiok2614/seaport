// PostList.js
import React from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';
import PostCardView from '../post-card-view/post-card-view';
import PostCardViewRight from '../post-card-view-large/post-card-view-large';
import PostCardViewMedium from '../post-card-view-medium/post-card-view-medium';
import './PostList.css';

const PostListViewHome = ({ postList }) => {
  return (
    <div className="post-list-container">
      {postList && postList.length > 0 ? (
        <>
          <div className="featured-post">
            {postList.slice(0, 1).map((post, i) => (
              <PostCardViewRight key={`entity-${i}`} post={post} />
            ))}
          </div>
          <div className="secondary-posts">
            {postList.slice(1, 4).map((post, i) => (
              <PostCardView
                key={`entity-${i}`}
                post={post}
                hideImage={true}
                hidesumary={true}
              />
            ))}
          </div>
          <div className="tertiary-additional">
            <div className="tertiary-post">
              {postList.slice(4, 5).map((post, i) => (
                <PostCardViewMedium key={`entity-${i}`} post={post} />
              ))}
            </div>
            <div className="additional-posts">
              {postList.slice(5, 8).map((post, i) => (
                <PostCardView key={`entity-${i}`} post={post} />
              ))}
            </div>
          </div>
          {/* <div className="other-posts">
            {postList.slice(8, 10).map((post, i) => (
              <PostCardView key={`entity-${i}`} post={post} />
            ))}
          </div> */}
        </>
      ) : (
        <div>
          <Translate contentKey="seaportApp.post.home.notFound">
            No Posts found
          </Translate>
        </div>
      )}
    </div>
  );
};

export default PostListViewHome;
