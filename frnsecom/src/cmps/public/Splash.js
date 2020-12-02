import {useEffect} from 'react';
import {useStateContext} from '../../utlts/Context';
import { paxios, setJWT, setUnAuthInterceptor} from '../../utlts/Axios';

import { APP_INIT, APP_MIN } from '../../utlts/store/reducers/app.reducer';
import { JWT_INVALID } from '../../utlts/store/reducers/auth.reducer';
import Page from '../cmns/Page';
import { useHistory, useLocation } from 'react-router-dom';

const Splash = ({ children })=>{
  const [ {app, auth}, dispatch ] = useStateContext();
  const routeHistory = useHistory();
  const routeLocation = useLocation();
  useEffect(()=>{
    if (!(app.initialized)) {
      setTimeout(() => { dispatch({type:APP_MIN}) }, 3000);
      appInit(auth, dispatch, { routeHistory, routeLocation });
    }
  },[]);
  if (!(app.initialized && app.minTimeElapsed )){
    return (
      <Page>
        <h1>Loading ...</h1>
      </Page>
    )
  } else {
   return (<section>{children}</section>)
  }
}
const unAuth = (dispatch, {routeLocation})=> {
  return ()=>{
    dispatch({type:JWT_INVALID, payload:{to:routeLocation.pathname}});
  }
}
const appInit = async (auth, dispatch, routeHooks)=>{
  //Setting unAuth
  setUnAuthInterceptor(unAuth(dispatch, routeHooks));

  if (auth.jwt === "" || auth.logged === false){
    dispatch({ type: APP_INIT })
  } else {
    try{
      setJWT(auth.jwt);
      await paxios.get("/api/heartbeat");
      dispatch({ type: APP_INIT })
    } catch(e){
      console.log(e);
    }
  }
}


export default Splash;
