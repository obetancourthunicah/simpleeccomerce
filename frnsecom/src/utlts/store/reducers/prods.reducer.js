import ListProductos from "../../../cmps/private/ListProductos";

const initialState = {
  hasMore:true,
  products:[],
  total:0,
  currentPage:0,
  pageLimit:10,
  fetching:false,
  error:'',
  currentId:null
}

export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_LOADED = "PRODUCT_LOADED";
export const PRODUCT_ERROR = "PRODUCT_ERROR";
export const PRODUCT_SET_CURRENT = "PRODUCT_SET_CURRENT";


const prodsReducer = (state = initialState, action = {}) =>{
  switch(action.type){
    case PRODUCT_LOADING:
      return { ...state, fetching:true};
    case PRODUCT_LOADED:
  
      return { ...state, products: [...state.products, ...action.payload], fetching:false}
    case PRODUCT_ERROR:
      return {...state, fetching:false}
    case PRODUCT_SET_CURRENT:
      return {...state}
    default:
      return state;
  }
}

export default prodsReducer;
