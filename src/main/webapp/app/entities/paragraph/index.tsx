import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Paragraph from './paragraph';
import ParagraphDetail from './paragraph-detail';
import ParagraphUpdate from './paragraph-update';
import ParagraphDeleteDialog from './paragraph-delete-dialog';

const ParagraphRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Paragraph />} />
    <Route path="new" element={<ParagraphUpdate />} />
    <Route path=":id">
      <Route index element={<ParagraphDetail />} />
      <Route path="edit" element={<ParagraphUpdate />} />
      <Route path="delete" element={<ParagraphDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ParagraphRoutes;
