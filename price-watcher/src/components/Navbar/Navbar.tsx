import pricewatcherLogo from '../../assets/pricewatcher.svg'
import "../Navbar/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo"><img src={pricewatcherLogo}/></div>
      <div className="navbar-links">
      </div>
    </nav>
  );
}

export default Navbar;
