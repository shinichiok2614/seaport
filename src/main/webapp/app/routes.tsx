import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import EntitiesRoutes from 'app/entities/routes';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import CategoryPage from './modules/category-page/category-page';
import PostViewPage from './modules/post-view-page/post-view-page';
import PostEditPage from './modules/post-edit-page/post-edit-page';
import ParagraphEditPage from './modules/paragraph-edit-page/paragraph-edit-page';
import ParagraphEditUpdate from './modules/paragraph-edit-update/paragraph-edit-update';
import PersonalPage from './modules/personal-page/personal-page';
import PersonUpdatePage from './modules/person-update-page/person-update-page';
import PersonApprovePage from './modules/person-approve-author/person-approve-author';
import PostApprovePage from './modules/post-approve-page/post-approve-page';
import PostApprovePageRemark from './modules/post-approve-page-remark/post-approve-page-remark';
import PersonalPageForward from './modules/personal-page-forward/personal-page-forward';
import PersonListPost from './component/person-list-post/person-list-post';
import ParagraphDelete from './modules/paragraph-edit-page/paragraph-delete';
import MessagePerson from './modules/message-person/message-person';
import MessagePersonRoomUpdate from './modules/message-person/message-person-room-update';

const loading = <div>loading ...</div>;

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => loading,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => loading,
});
const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route index element={<Home />} />
        <Route path="categorypage/:id" element={<CategoryPage />} />
        <Route path="personalapprovepage/" element={<PersonApprovePage />} />
        <Route path="personalupdatepage/:id" element={<PersonUpdatePage />} />
        <Route path="personalupdatepage/new" element={<PersonUpdatePage />} />
        <Route path="personalpageforward/" element={<PersonalPageForward />} />
        <Route path="personalpage/:id" element={<PersonalPage />} />
        <Route path="postpage/:id" element={<PostViewPage />} />
        <Route path="postpage/new" element={<PostEditPage />} />
        <Route path="personlistpost/:id" element={<PersonListPost />} />
        <Route path="posteditpage/:id" element={<PostEditPage />} />
        <Route path="paragrapheditpage/:id" element={<ParagraphEditPage />} />
        <Route path="messageperson/" element={<MessagePerson />} />
        <Route path="paragrapheditupdatepage/:id" element={<ParagraphEditUpdate />} />
        <Route path="paragraphdelete/:id" element={<ParagraphDelete />} />
        <Route path="postapprovepage/" element={<PostApprovePage />} />
        <Route path="postapprovepageremark/:id" element={<PostApprovePageRemark />} />
        <Route path="messagepersonroomupdate/:id" element={<MessagePersonRoomUpdate />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="account">
          <Route
            path="*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<Activate />} />
          <Route path="reset">
            <Route path="request" element={<PasswordResetInit />} />
            <Route path="finish" element={<PasswordResetFinish />} />
          </Route>
        </Route>
        <Route
          path="admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <EntitiesRoutes />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
