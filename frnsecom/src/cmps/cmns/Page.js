import "./Page.css";
import Header from './Header';
import Footer from './Footer';
const Page = ( { children, headding, footer } )=>{
  const hofset = (41*((headding && true)?1:0)) + (59*((footer&&true)?1:0));
  let cssStyles = {
    "height": (hofset > 0 )? `calc(100vh - ${hofset}px)`:`100%`,
    "marginTop": (hofset > 0) ? `41px`: '0px'
  }
  let cssStylesContent = {
    "minHeight": (hofset > 0) ? `calc(100vh - ${hofset}px)` : `100%`,
  }
  console.log(cssStyles)
  return(
    <section className="page" style={cssStyles}>
        {(headding && true ? (<Header>{headding}</Header>) : null)}
        <section className="content" style={cssStylesContent} >{children}</section>
        {(footer && true ? (<Footer></Footer>) : null)}
    </section>
  )
}
export default Page;
