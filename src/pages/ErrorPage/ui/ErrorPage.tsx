import React from 'react';
import {
  useRouteError,
  useNavigate,
  isRouteErrorResponse
} from 'react-router-dom';

interface RouteError {
  statusText?: string;
  data?: {
    message?: string;
  };
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError | undefined;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error && isRouteErrorResponse(error) && (
        <p>
          <i>{error.statusText || error.data?.message}</i>
        </p>
      )}
      <button
        type='button'
        onClick={() => {
          navigate(-1);
        }}
      >
        Return back
      </button>
    </div>
  );
};

export default ErrorPage;
