import './Field.css';
const Field = ({id, type, caption, value, onChange, ...rest}) => {
  return (
    <div className="field">
      <label>{caption}</label>
      <input type={type} name={id} value={value} onChange={onChange} {...rest}></input>
    </div>
  );
}

export default Field;
