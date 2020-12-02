import { Route, Redirect, useLocation } from 'react-router-dom';
import { useStateContext } from './Context';

const PrivateRoute = (props) => {
  const { component: MyCustomComponent, ...rest } = props;
  const [{auth}, ] = useStateContext();
  return (
    <Route
      {...rest}
      render={
        (props) => {
          const {location} = props;
          return (
            (auth.logged) ? (<MyCustomComponent {...props} />) : (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
          )
        }
      }
    />
  )
}

export default PrivateRoute;
