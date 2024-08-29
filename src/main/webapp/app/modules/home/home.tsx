import './home.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import WeatherComponent from 'app/component/WeatherComponent/WeatherComponent';
import { getEntityWithPost } from 'app/entities/category/category.reducer';
import CategoryCardView from 'app/component/category-card-view/category-card-view';
import CategoryTitle from 'app/component/category-header/category-header';
import LazyLoad from 'react-lazyload';

export const Home = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const categoryList = useAppSelector(state => state.category.entities);
  const loading = useAppSelector(state => state.category.loading);
  useEffect(() => {
    // dispatch(getEntityWithPost());
  }, []);
  const Loading = () => (
    <div className="post loading">
      <h5>Loading...</h5>
    </div>
  );
  return (
    <div className="home">
      <div className="left">
        <div className="category-title">
          <CategoryTitle categories={categoryList.slice(0, 10)} />
        </div>
        {categoryList.length > 0
          ? categoryList.map((category, i) => (
              // <LazyLoad key={category.id} placeholder={<Loading />}>
              <CategoryCardView key={category.id} category={category}></CategoryCardView>
              // </LazyLoad>
            ))
          : !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="seaportApp.category.home.notFound">No Categories found</Translate>
              </div>
            )}
      </div>
      <div className="right">
        <div className="login">
          {account?.login ? (
            <div>
              <Alert color="success">
                <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                  You are logged in as user {account.login}.
                </Translate>
              </Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>
                &nbsp;
                <Link to="/account/register" className="alert-link">
                  <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                </Link>
              </Alert>
            </div>
          )}
        </div>
        <WeatherComponent />
      </div>
    </div>
  );
};

export default Home;
