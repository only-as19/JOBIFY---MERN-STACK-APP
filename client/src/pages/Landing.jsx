import Wrapper from "../assets/wrappers/LandingPage"
import { Link } from "react-router-dom";
import { Logo } from "../components"
import main from "../assets/images/main.svg"
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app 
          </h1>
          <p>
            I'm baby farm-to-table bicycle rights, whatever keytar normcore
            Austin. Freegan cred raw denim brunch everyday carry hexagon
            farm-to-table. Vinyl post-ironic four dollar toast vegan taxidermy.
          </p>
          <Link to='/register' className="btn register-link">Login/Register</Link>
          <Link to='/login' className="btn">Login</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;
