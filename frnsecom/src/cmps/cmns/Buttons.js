import {MdAdd } from 'react-icons/md';
import './Buttons.css';
export const Button = ({children, onClick, ...rest}) =>{
    const _onClick = onClick || ((e)=>{e.preventDefault(); e.stopPropagation();});
    return (
      <button {...rest} onClick={_onClick}>{children}</button>
    )
}

export const PrimaryButton = ({onClick, children, ...rest})=>{
  return (
    <Button {...rest} className="btnprimary" onClick={onClick}>
      {children}
    </Button>
  )
}

export const SecondaryButton = ({ onClick, children, ...rest }) => {
  return (
    <Button {...rest} className="btnsecondary" onClick={onClick}>
      {children}
    </Button>
  )
}

export const AddButton = ({onClick, ...rest})=>{
  return (
    <Button {...rest} className="btnround btnaccent" onClick={onClick}>
      <MdAdd size="2em"></MdAdd>
    </Button>
  )
}
