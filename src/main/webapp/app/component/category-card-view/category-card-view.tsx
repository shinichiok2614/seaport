import React from 'react';
import PostListViewHome from '../post-list-view-home/post-list-view-home';
import './CategoryCardView.css';
import { useNavigate } from 'react-router-dom';
const CategoryCardView = ({ category }) => {
  const navigate = useNavigate();
  const handleCategoryClick = () => {
    navigate(`/categorypage/${category.id}`);
  };

  return (
    <div className="category">
      <div className="category1">
        <div className="category1-name" onClick={handleCategoryClick}>
          {category.name}
        </div>
      </div>
      <div className="category2">
        {category.posts && category.posts.length > 0 ? (
          <>
            <div>
              <PostListViewHome postList={category.posts}></PostListViewHome>
            </div>
          </>
        ) : (
          <div>No posts</div>
        )}
      </div>
    </div>
  );
};
export default CategoryCardView;
