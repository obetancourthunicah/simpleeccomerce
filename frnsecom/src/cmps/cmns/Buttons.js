import {MdAdd } from 'react-icons/md';
import './Buttons.css';
export const Button = ({children, onClick, ...rest}) =>{
    const _onClick = onClick || ((e)=>{e.preventDefault(); e.stopPropagation();});
    return (
      <button {...rest} onClick={_onClick}>{children}</button>
    )
}

export const AddButton = ({onClick, ...rest})=>{
  return (
    <Button {...rest} className="btnround btnaccent" onClick={onClick}>
      <MdAdd size="2em"></MdAdd>
    </Button>
  )
}
