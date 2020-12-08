import ListProductos from "../../../cmps/private/ListProductos";

const initialState = {
  hasMore:true,
  products:[],
  total:0,
  currentPage:1,
  pageLimit:6,
  fetching:false,
  error:'',
  currentId:null,
  searchFilter:''
}

export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_LOADED = "PRODUCT_LOADED";
export const PRODUCT_RESET = "PRODUCT_RESET";
export const PRODUCT_ERROR = "PRODUCT_ERROR";
export const PRODUCT_SET_CURRENT = "PRODUCT_SET_CURRENT";


const prodsReducer = (state = initialState, action = {}) =>{
  switch(action.type){
    case PRODUCT_LOADING:
      return { ...state, fetching:true};
    case PRODUCT_LOADED:
      let nproducts = [];
      let newCurrentPage = state.currentPage;
      if(state.currentPage >= action.payload.currentPage) {
        nproducts = [...state.products];
      } else {
        nproducts = [...state.products, ...action.payload.products];
        newCurrentPage = action.payload.currentPage;
      }
      const hasMore = (nproducts.length < action.payload.total);
      return {
        ...state,
        products:nproducts,
        total:nproducts.length,
        hasMore: hasMore,
        currentPage: newCurrentPage,
        fetching: false
      }
    case PRODUCT_RESET:
      return { ...initialState, searchFilter: action.payload.searchFilter};
    case PRODUCT_ERROR:
      return {...state, fetching:false}
    case PRODUCT_SET_CURRENT:
      return {...state}
    default:
      return state;
  }
}

export default prodsReducer;
