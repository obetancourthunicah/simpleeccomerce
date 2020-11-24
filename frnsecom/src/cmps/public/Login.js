import {useState} from 'react';
import Page from '../cmns/Page';
import Field from '../cmns/Field';
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

  const onChange = (e)=>{
    const  {name, value} = e.target;
    setForm({
      ...form, //spread Operator 
      [name] : value,
    });
    // Spread Usage
    // const v1 = {a:1, b:2};  const v2 = {...v1, c:3, d:4}; // {a:1, b:2, c:3, d:4}
    // const v2 = {v1, c:3, d:4} // {v1:{a:1, b:2}, c:3, d:4}


    // console.log(e.target);
    // if(e.target.name =="Email"){
    //   setEmail(e.target.value);
    // }
    // if (e.target.name == "Pswd") {
    //   setPswd(e.target.value);
    // }
  }
  const onLogin = (e)=>{
    const { email, password} = form;
    //call a model (axios)
    console.log( email);
    console.log( password);
  }
  return (
    <Page headding="Iniciar Sesión">
      <section className="loginsection">
        <Field id="email" caption="Correo" type="text" value={form.email} onChange={onChange} />
        <Field id="password" caption="Contraseña" type="password" value={form.password} onChange={onChange} />
        <button onClick={onLogin}>Login</button>
      </section>
    </Page>
  )

}

export default Login;
