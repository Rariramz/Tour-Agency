import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Account = { id: number; email: string; role: string };
export type AuthResponse = { token: string; user: Account };

type AuthState = { token: string | null; user: Account | null };
const initialState: AuthState = {
  token: sessionStorage.getItem('tourAgencyToken'),
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signedIn(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userLoaded(state, action: PayloadAction<Account>) {
      state.user = action.payload;
    },
    signedOut(state) {
      state.token = null;
      state.user = null;
    }
  }
});

export const { signedIn, userLoaded, signedOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
