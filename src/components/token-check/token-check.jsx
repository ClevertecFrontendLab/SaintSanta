import { Navigate } from 'react-router-dom';

export const TokenCheck = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/auth' />;
  }

  return children;
};
