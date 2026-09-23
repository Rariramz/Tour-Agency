import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signedOut } from '../../../entities/auth/model/authSlice';
import { baseApi } from '../../../shared/api/baseApi';

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.removeItem('tourAgencyToken');
    dispatch(signedOut());
    dispatch(baseApi.util.resetApiState());
    navigate('/explore', { replace: true });
  }, [dispatch, navigate]);
  return <p role='status'>Signing out…</p>;
};
