import { FaAlignLeft } from "react-icons/fa6";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import ToggleTheme from "./ToggleTheme";
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo/>
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">
          <ToggleTheme/>
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
