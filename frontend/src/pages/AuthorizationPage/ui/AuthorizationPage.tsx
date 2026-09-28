import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import {
  useLoginMutation,
  useRegisterMutation
} from '../../../entities/auth/api/authApi';
import { signedIn } from '../../../entities/auth/model/authSlice';
import { baseApi } from '../../../shared/api/baseApi';
import cls from './AuthorizationPage.module.scss';

const AuthorizationPage = () => {
  const [registration, setRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [login, loginState] = useLoginMutation();
  const [register, registerState] = useRegisterMutation();
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState: unknown = location.state;
  const from =
    typeof navigationState === 'object' &&
    navigationState !== null &&
    'from' in navigationState &&
    typeof navigationState.from === 'string' &&
    navigationState.from.startsWith('/') &&
    !navigationState.from.startsWith('//')
      ? navigationState.from
      : '/explore';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (registration && password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const credentials = { email: email.trim().toLowerCase(), password };
      const response = await (registration
        ? register(credentials)
        : login(credentials)
      ).unwrap();
      sessionStorage.setItem('tourAgencyToken', response.token);
      dispatch(baseApi.util.resetApiState());
      dispatch(signedIn(response));
      navigate(from, { replace: true });
    } catch (failure: unknown) {
      const status =
        typeof failure === 'object' && failure !== null && 'status' in failure
          ? failure.status
          : undefined;
      if (status === 401) setError('Incorrect email or password.');
      else if (status === 409)
        setError('An account with this email already exists.');
      else if (status === 400)
        setError('Enter a valid email and a password of 8 to 72 characters.');
      else setError('Could not connect. Please try again.');
    }
  }

  if (token) {
    return (
      <main className={cls.authorizationPage}>
        <div className={cls.authorizationPageCard}>
          <h1>You are signed in</h1>
          <Link to='/explore'>Explore tours</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={cls.authorizationPage}>
      <form
        className={cls.authorizationPageCard}
        onSubmit={(event) => {
          void submit(event);
        }}
      >
        <h1>{registration ? 'Create an account' : 'Sign in'}</h1>
        <label htmlFor='auth-email'>Email</label>
        <input
          id='auth-email'
          type='email'
          autoComplete='email'
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor='auth-password'>Password</label>
        <input
          id='auth-password'
          type='password'
          minLength={8}
          maxLength={72}
          autoComplete={registration ? 'new-password' : 'current-password'}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {registration && (
          <>
            <label htmlFor='auth-confirm'>Confirm password</label>
            <input
              id='auth-confirm'
              type='password'
              autoComplete='new-password'
              required
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
          </>
        )}
        {error && (
          <p
            role='alert'
            className={cls.authorizationPageError}
          >
            {error}
          </p>
        )}
        <button
          type='submit'
          disabled={loginState.isLoading || registerState.isLoading}
        >
          {registration ? 'Create account' : 'Sign in'}
        </button>
        <button
          type='button'
          className={cls.modeSwitch}
          onClick={() => {
            setError('');
            setRegistration(!registration);
          }}
        >
          {registration
            ? 'Already have an account? Sign in'
            : 'New here? Create an account'}
        </button>
      </form>
    </main>
  );
};
export default AuthorizationPage;
