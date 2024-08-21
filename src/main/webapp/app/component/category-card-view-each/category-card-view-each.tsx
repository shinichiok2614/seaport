import React from 'react';
import PostListViewEach from '../post-list-view-each/post-list-view-each';

const CategoryCardViewEach = ({ category }) => {
  return (
    <div className="category">
      <div className="category1">
        <div className="category1-name">{category.name}</div>
      </div>
      <div className="category2">
        {category.posts && category.posts.length > 0 ? (
          <>
            <div>
              <PostListViewEach postList={category.posts}></PostListViewEach>
            </div>
          </>
        ) : (
          <div>No posts</div>
        )}
      </div>
    </div>
  );
};
export default CategoryCardViewEach;
