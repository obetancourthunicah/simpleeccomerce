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

export const PRODUCT_LOADING = "";
export const PRODUCT_LOADED = "";
export const PRODUCT_ERROR = "";
export const PRODUCT_SET_CURRENT = "";


const prodsReducer = (state = initialState, action = {}) =>{
  switch(action.type){
    case PRODUCT_LOADING:
      return {...state};
    case PRODUCT_LOADED:
      return {...state}
    case PRODUCT_ERROR:
      return {...state}
    case PRODUCT_SET_CURRENT:
      return {...state}
    default:
      return state;
  }
}

export default prodsReducer;
