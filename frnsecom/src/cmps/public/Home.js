import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Page from '../cmns/Page';
import "./Home.css";
const Home = () => {
    let [redirect, setRedirect] = useState("");
    if (redirect !==""){
      return (<Redirect to={redirect}></Redirect>);
    }
    return (
      <Page headding="Principal" footer={true}>
        <section className="homesection">
          <section>
          </section>
          <section><button onClick={(e)=>{setRedirect("/login")}}>Login</button>
          <button onClick={(e) => { setRedirect("/sigin") }}>Signin</button>
          </section>
        </section>
      </Page>
    )
}

export default Home;
