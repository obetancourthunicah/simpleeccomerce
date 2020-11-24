import "./Page.css";
import Header from './Header';
const Page = ( { children, headding } )=>{
  let cssStyles = {
    "minHeight": `calc(100vh${(headding && true) ? '-56px': ''})`,
  }
  console.log(cssStyles)
  return(
    <section className="page">
        {(headding && true ? (<Header>{headding}</Header>) : null)}
        <section style={cssStyles}>{children}</section>
    </section>
  )
}
export default Page;
