import { useRouteError } from "react-router-dom"

const ErrorComponent = () => {
    const error = useRouteError()
    console.log(error);
    
  return (
    <h4>Some went wrong</h4>
  )
}
export default ErrorComponent