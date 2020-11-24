import './Header.css';
const Header = ( {children}) =>{
  return (
    <header className="header">
      <h1>{children}</h1>
    </header>
  );
}
// Read about css namespacing
export default Header;
