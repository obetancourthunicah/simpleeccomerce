import {MdHome} from 'react-icons/md';
import {FaUserPlus} from 'react-icons/fa';
import { IoMdHand } from 'react-icons/io';
import  {NavLink} from 'react-router-dom';

import "./Footer.css";
const Footer = ()=>{
  return (
    <footer>
      <nav>
      <ul>
        <li><NavLink to="/"><MdHome size="1.5em"/></NavLink></li>
        <li><NavLink to="/login"><FaUserPlus size="1.5em"></FaUserPlus></NavLink></li>
        <li><NavLink to="/signin"><IoMdHand size="1.5em"></IoMdHand></NavLink></li>
        <li><NavLink to="/productos"><IoMdHand size="1.5em"></IoMdHand></NavLink></li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;
