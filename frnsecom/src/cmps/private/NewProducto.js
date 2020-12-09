import {useState} from 'react';
import {useStateContext } from "../../utlts/Context";
import {useHistory} from "react-router-dom";
import Page from '../cmns/Page';
import Field from '../cmns/Field';

const NewProduct = ()=>{
    const [, dispatch] = useStateContext();
    const [form, setForm] = useState({sku:'',name:'',price:0, stock:0});
    const history = useHistory();
  /*
  sku:PRD010
name:Producto 10
price:20
stock:200
   */
    const onChange = (e)=>{
      e.preventDefault();
      e.stopPropagation();
      const {name, value} = e.target;
      let newForm = { ...form, [name]:value };
      setForm(newForm);
    }
    return (
      <Page headding="Nuevo">
        <Field
          type="text"
          id="sku"
          placeholder="Código eg: PRD001"
          onChange={onChange}
          caption="Código"
          value={form.sku}
        />
        <Field 
          type="text"
          id="name"
          placeholder="Nombre del Producto"
          onChange={onChange}
          caption="Producto"
          value={form.name}
        />
        <Field
          type="number"
          id="price"
          placeholder="Precio"
          onChange={onChange}
          caption="Precio"
          value={form.price}
        />
        <Field
          type="number"
          id="stock"
          placeholder="Intentario"
          onChange={onChange}
          caption="Inventario"
          value={form.stock}
        />
        <section>
          <button onClick={()=>{alert("Click para Agregar"+ JSON.stringify(form))}}>Agregar</button>
          <button onClick={()=>{history.push("/productos")}}>Cancelar</button>
        </section>
      </Page>
    );
}

export default NewProduct;
