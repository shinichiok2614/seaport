import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPersonByUser } from 'app/entities/person/person.reducer';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const PersonalPageForward = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(state => state.authentication.account);
  const currentUserLoading = useAppSelector(
    state => state.authentication.loading,
  );

  useEffect(() => {
    if (currentUser.person && !currentUserLoading) {
      navigate(`/personalpage/${currentUser.person.id}`);
    }
    if (currentUser.person == null && !currentUserLoading) {
      navigate(`/personalupdatepage/new`);
    }
  }, [currentUser, navigate, currentUserLoading]);

  return null;
};

export default PersonalPageForward;
