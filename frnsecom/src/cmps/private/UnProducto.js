import {useEffect, useState} from 'react';
import {useStateContext } from "../../utlts/Context";
import {paxios} from "../../utlts/Axios";
import {useHistory} from "react-router-dom";
import Page from '../cmns/Page';
import Field from '../cmns/Field';
import { SecondaryButton, PrimaryButton } from '../cmns/Buttons';
const UnProducto = ()=>{
    const [ {prods}, ] = useStateContext();
    const [form, setForm] = useState({sku:'',name:'',price:0, stock:0});
    const history = useHistory();
    console.log(prods);
    useEffect(
      ()=>{
        console.log(prods);
        const  _id  = prods.currentId;
        paxios.get(`/api/productos/one/${_id}`)
          .then(({data})=>{
              console.log(data);
              setForm(data);
          })
          .catch((ex)=>{
            console.log(ex);
            alert("Algo salio mal.");
            history.push("/productos");
          });
      }
      ,[]
    );
    if(form.sku===''){
      return (<h1>Cargando....</h1>);
    }
    return (
      <Page headding={form.name.substr(0,20) + "..."}>
        <Field
          type="text"
          id="sku"
          placeholder="Código eg: PRD001"
          caption="Código"
          value={form.sku}
          readonly={true}
        />
        <Field 
          type="text"
          id="name"
          placeholder="Nombre del Producto"
          caption="Producto"
          value={form.name}
          readonly={true}
        />
        <Field
          type="number"
          id="price"
          placeholder="Precio"
          caption="Precio"
          value={form.price}
          readonly={true}
        />
        <Field
          type="number"
          id="stock"
          placeholder="Inventario"
          caption="Inventario"
          value={form.stock}
          readonly={true}
        />
        <section>
          <PrimaryButton onClick={() => { history.push("/productos") }}>Regresar</PrimaryButton>
        </section>
      </Page>
    );
}

export default UnProducto;
