import { APP_DATE_FORMAT } from 'app/config/constants';
import React from 'react';
import { TextFormat } from 'react-jhipster';

export const PostPageViewSummary = ({ postEntity }) => {
  return (
    <div className="post-page">
      {postEntity.category && <div>{postEntity.category.name}</div>}
      {/* <div>{postEntity.summary}</div> */}
      <span>
        {postEntity.createdAt ? (
          <TextFormat
            value={postEntity.createdAt}
            type="date"
            format={APP_DATE_FORMAT}
          />
        ) : null}
      </span>
    </div>
  );
};
export default PostPageViewSummary;
