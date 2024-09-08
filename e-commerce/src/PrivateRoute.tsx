import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
  roleRequired?: string;
}

const PrivateRoute: React.FC<Props> = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user) {
    return <Navigate to="/" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
