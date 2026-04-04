import { useDashboardContext } from "../pages/DashboardLayout"
import links from "../utils/links"
import { NavLink } from "react-router-dom"
const NavLinks = () => {
  const { toggleSidebar, user } = useDashboardContext()
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user
        if(path === 'admin' && role !== 'admin') return null
        return (
          <NavLink key={path} to={path} className="nav-link">
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
export default NavLinks