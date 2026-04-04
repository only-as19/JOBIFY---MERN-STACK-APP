import Wrapper from "../assets/wrappers/ErrorPage"
import {Link,useRouteError} from "react-router-dom"
import img from "../assets/images/not-found.svg"
const Error = () => {
  const error = useRouteError()
  if (error.status === 404) { 
    return (
      <Wrapper>
        <div>
          <img src={img} alt="No found" />
          <h3>Oh! Page not found</h3>
          <p>The page you are looking for does not exist.</p>
          <Link to="/dashboard">Go back home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h3>Something went wrong</h3>
    </Wrapper>
  );
};
export default Error;
