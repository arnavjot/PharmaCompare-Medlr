import React from 'react';

const ErrorAlert = ({ message }) => (
  <div className="alert alert-danger text-center" role="alert">
    {message || 'An error occurred. Please try again later.'}
  </div>
);

export default ErrorAlert;
