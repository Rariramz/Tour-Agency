import { baseApi } from '../../../shared/api/baseApi';
import { Account, AuthResponse } from '../model/authSlice';

type Credentials = { email: string; password: string };

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, Credentials>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation<AuthResponse, Credentials>({
      query: (credentials) => ({
        url: 'auth/registration',
        method: 'POST',
        body: credentials
      })
    }),
    me: builder.query<Account, void>({ query: () => 'auth/me' })
  })
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
