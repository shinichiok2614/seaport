// src/components/CategoryTitle.js

import React from 'react';
import PropTypes from 'prop-types';
import './CategoryTitle.css';
import { useNavigate } from 'react-router';

const CategoryTitle = ({ categories }) => {
  const navigate = useNavigate();
  const handleCategoryName = category => {
    navigate(`/categorypage/${category.id}`);
  };
  return (
    <div className="category-title-container">
      {categories.map(category => (
        <div
          key={category.id}
          className="category-card"
          onClick={() => handleCategoryName(category)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

CategoryTitle.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CategoryTitle;
