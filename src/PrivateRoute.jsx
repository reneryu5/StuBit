
import PropTypes from 'prop-types';
import { useAuth } from './components/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const { user } = useAuth();

  return user ? <Component /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
