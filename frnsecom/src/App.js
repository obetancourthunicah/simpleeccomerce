import './App.css';
import './utlts/Transitions.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {StateProvider} from './utlts/Context';
import mainReducer from './utlts/store/store';
import PrivateRoute from './utlts/PrivateRoute';
import Splash from './cmps/public/Splash';
import { AnimatedSwitch } from 'react-router-transition';
import { pageTransitions as transition, mapGlideStyles as mapStyles } from './utlts/Transitions';


import Home from './cmps/public/Home';
import Login from './cmps/public/Login';

import ListProducts from './cmps/private/ListProductos';

import NotFound from './cmps/public/NotFound';

function App() {
  let appState = mainReducer();
  return (
    <StateProvider initialState={appState} reducer={mainReducer}>
      <div className="App">
        <Router>
          <Splash>
            <AnimatedSwitch
              {...transition}
              mapStyles={mapStyles}
              className="switch-wrapper"
            >
              <Route path="/" exact component={Home} />
              <Route path="/login"  component={Login} />
              <PrivateRoute path="/productos"  component={ListProducts}/>
              

              <Route path="*" component={NotFound} />
            </AnimatedSwitch>
          </Splash>
        </Router>
      </div>
    </StateProvider>
  );
}

export default App;
