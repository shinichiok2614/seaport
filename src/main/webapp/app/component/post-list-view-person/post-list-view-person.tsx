// PostList.js
import React from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';
import PostCardView from '../post-card-view/post-card-view';

const PostListViewProfile = ({ postList }) => {
  return (
    <div>
      {postList && postList.length > 0 ? (
        postList.map((post, i) => <PostCardView key={`entity-${i}`} post={post} />)
      ) : (
        <div>
          <Translate contentKey="seaportApp.post.home.notFound">No Posts found</Translate>
        </div>
      )}
    </div>
  );
};

export default PostListViewProfile;
