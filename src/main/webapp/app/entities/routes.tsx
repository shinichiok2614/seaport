import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Person from './person';
import Department from './department';
import Category from './category';
import Post from './post';
import Paragraph from './paragraph';
import Comment from './comment';
import Message from './message';
import Room from './room';
import RoomMember from './room-member';
import Follow from './follow';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="person/*" element={<Person />} />
        <Route path="department/*" element={<Department />} />
        <Route path="category/*" element={<Category />} />
        <Route path="post/*" element={<Post />} />
        <Route path="paragraph/*" element={<Paragraph />} />
        <Route path="comment/*" element={<Comment />} />
        <Route path="message/*" element={<Message />} />
        <Route path="room/*" element={<Room />} />
        <Route path="room-member/*" element={<RoomMember />} />
        <Route path="follow/*" element={<Follow />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
