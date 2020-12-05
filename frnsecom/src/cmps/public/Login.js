import { useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import Page from '../cmns/Page';
import Field from '../cmns/Field';

import {useStateContext} from '../../utlts/Context';

import {naxios as axios, setJWT} from '../../utlts/Axios';

import './Login.css';
import { LOGIN_FETCHING, LOGIN_FETCHING_FAILED, LOGIN_SUCCESS } from '../../utlts/store/reducers/auth.reducer';
//Componente que maneja el estado.

//React state es gestionar en variables los valores dinamicos del componente
//valores dinámicos midifcan el DOM (shadowDOM)
const Login = () => {
  //const [email, setEmail] = useState("");
  //const [pswd, setPswd] = useState("");

  const [form, setForm] = useState({
    email:'',
    password:''
  });

  const [, dispatch] = useStateContext();
  const routeHistory = useHistory();
  const location = useLocation();

  const onChange = (e)=>{
    const  {name, value} = e.target;
    setForm({
      ...form, //spread Operator 
      [name] : value,
    });
  }

  let { from } = location.state || { from: { pathname: "/" } };
  const onLogin = (e)=>{
    const { email, password} = form;
    //call a model (axios)
    dispatch({ type: LOGIN_FETCHING });
    axios.post(
      '/api/security/login',
       {email, password}
    ).then(({data})=>{
      dispatch({type:LOGIN_SUCCESS, payload:data});
      setJWT(data.jwt);
      routeHistory.replace(from);
    }).catch((err)=>{
      dispatch({ type: LOGIN_FETCHING_FAILED });
      console.log(err);
    })
  }

  return (
    <Page headding="Iniciar Sesión">
      <section className="loginsection">
        <Field id="email" caption="Correo" type="text" value={form.email} onChange={onChange} />
        <Field id="password" caption="Contraseña" type="password" value={form.password} onChange={onChange} />
        <button onClick={onLogin}>Login</button>
        <br/>
        <Link to="/">Go Home</Link>
      </section>
    </Page>
  )

}

export default Login;
