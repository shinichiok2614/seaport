import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntityWithPost } from 'app/entities/category/category.reducer';
import CategoryCardView from 'app/component/category-card-view/category-card-view';
import CategoryCardViewEach from 'app/component/category-card-view-each/category-card-view-each';

export const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();
  const categoryList = useAppSelector(state => state.category.entities);
  const loading = useAppSelector(state => state.category.loading);

  useEffect(() => {
    dispatch(getEntityWithPost());
  }, [dispatch]);

  const selectedCategory = categoryList.find(
    category => category.id.toString() === id,
  );

  return (
    <div className="home">
      <div className="left">
        {selectedCategory ? (
          <CategoryCardViewEach
            key={selectedCategory.id}
            category={selectedCategory}
          />
        ) : !loading ? (
          <div className="alert alert-warning">
            <Translate contentKey="seaportApp.category.home.notFound">
              No Categories found
            </Translate>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryPage;
