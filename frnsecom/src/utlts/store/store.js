//TODO: Import Reducers by Entity
import appReducer from './reducers/app.reducer';
import authReducer from './reducers/auth.reducer';
import prodsReducer from './reducers/prods.reducer';

function mainReducer (state={}, action={}) {
  const {app, auth, prods} = state;
  return {
    app: appReducer (app, action),
    auth: authReducer(auth, action),
    prods: prodsReducer (prods, action)
  }
}

export default mainReducer;
