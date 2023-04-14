import React from 'react';
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button
        type="button"
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