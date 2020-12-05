import { useStateContext } from '../../utlts/Context';
import { AddButton } from '../cmns/Buttons';
import Page from '../cmns/Page';
import {paxios} from '../../utlts/Axios';
import './ListProductos.css';
import { useEffect } from 'react';
import { PRODUCT_ERROR, PRODUCT_LOADED, PRODUCT_LOADING } from '../../utlts/store/reducers/prods.reducer';

const ListProductos = ()=>{
  const [{prods}, dispatch] = useStateContext();
  
  const listElements = prods.products.map((o)=>{
    return (<li key={o._id}>{o.sku} {o.name} <span>{o.price}</span></li>);
  })
  useEffect(
    ()=>{
      if (prods.products.length == 0) {
        dispatch({ type: PRODUCT_LOADING})
        paxios.get('/api/productos/all')
          .then(({data})=>{
            dispatch({type:PRODUCT_LOADED, payload:data});
            console.log(data);
          })
          .catch((ex)=>{
            dispatch({ type: PRODUCT_ERROR });
            console.log(ex)
        }); //end paxios
      }
    }
  , []);
  return (
    <Page headding="Productos" footer={true}>
      <ul className="productoList">
        {listElements}
      </ul>
      <AddButton style={{position:"fixed", right:"1em", bottom:"5em"}}></AddButton>
    </Page>
  );
}

export default ListProductos;
