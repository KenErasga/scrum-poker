import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../components/Accounts/CognitoProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
};

export default PrivateRoute