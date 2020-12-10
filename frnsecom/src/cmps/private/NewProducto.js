import {useState} from 'react';
import {useStateContext } from "../../utlts/Context";
import {paxios} from "../../utlts/Axios";
import {useHistory} from "react-router-dom";
import Page from '../cmns/Page';
import Field from '../cmns/Field';
import { SecondaryButton, PrimaryButton } from '../cmns/Buttons';
import { PRODUCT_RESET} from '../../utlts/store/reducers/prods.reducer'
const NewProduct = ()=>{
    const [, dispatch] = useStateContext();
    const [form, setForm] = useState({sku:'',name:'',price:0, stock:0});
    const history = useHistory();
    const onChange = (e)=>{
      e.preventDefault();
      e.stopPropagation();
      const {name, value} = e.target;
      let newForm = { ...form, [name]:value };
      setForm(newForm);
    }
    const addNewProducto = (e)=>{
      e.preventDefault();
      e.stopPropagation();
      paxios.post('/api/productos/new', form)
        .then((data)=>{
          console.log(data);
          dispatch({ type: PRODUCT_RESET});
          history.push("/productos");
        })
        .catch((ex)=>{
          console.log(ex);
          alert("Algo salio mál al ingresar");
        })
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
          <PrimaryButton onClick={addNewProducto}>Agregar</PrimaryButton>
          <SecondaryButton onClick={() => { history.push("/productos") }}>Cancelar</SecondaryButton>
        </section>
      </Page>
    );
}

export default NewProduct;
