import { NavLink, Link } from "react-router-dom";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link to="/" className="logo">
        Surface <span>Failures</span>
      </Link>
      <nav className="nav-links" aria-label="Main">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/mars-exploration">Mars Hub</NavLink>
        <NavLink to="/lunar-exploration">Lunar Hub</NavLink>
      </nav>
    </header>
  );
}
