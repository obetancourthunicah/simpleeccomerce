import logo from './logo.svg';
import './App.css';

import Home from './cmps/public/Home';
import Login from './cmps/public/Login';

// function Mensaje( {children} ){
//   return (
//     <section>
//     <h2>Este es un Mensaje</h2>
//     <div>{children}</div>
//     </section>
//   );
// }

// function Quotes( props ){
//   let {text} = props;
//   return (
//     <blockquote>{text}</blockquote>
//   );
// }

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
