import {MdHome} from 'react-icons/md';
import {FaUserPlus} from 'react-icons/fa';
import { IoMdGrid, IoMdHand } from 'react-icons/io';
import  {NavLink} from 'react-router-dom';

import "./Footer.css";
import { useStateContext } from '../../utlts/Context';
const Footer = ()=>{
  const [{auth}, ] = useStateContext();
  let nav = (
    <ul>
    <li><NavLink to="/"><MdHome size="1.5em" /></NavLink></li>
    <li><NavLink to="/login">Login</NavLink></li>
    <li><NavLink to="/signin">Signin</NavLink></li>
    </ul>);
  if (auth.logged){
    nav = (
      <ul>
        <li><NavLink to="/"><MdHome size="1.5em" /></NavLink></li>
        <li><NavLink to="/productos"><IoMdGrid size="1.5em"></IoMdGrid></NavLink></li>
      </ul>
    );
  }
  return (
    <footer>
      <nav>
        {nav}
      </nav>
    </footer>
  )
}

export default Footer;
