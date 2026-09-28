import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useMeQuery } from '../api/authApi';
import { signedOut, userLoaded } from '../model/authSlice';

export const SessionSync = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const { data, error } = useMeQuery(undefined, { skip: !token });
  useEffect(() => {
    if (data && token) dispatch(userLoaded(data));
  }, [data, token, dispatch]);
  useEffect(() => {
    if (error && 'status' in error && error.status === 401 && token) {
      sessionStorage.removeItem('tourAgencyToken');
      dispatch(signedOut());
    }
  }, [error, token, dispatch]);
  return null;
};
