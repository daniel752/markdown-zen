/* eslint-disable react/no-unescaped-entities */
import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="Not found" />
          <h3>Oi vey! page not found</h3>
          <p>Can't find the page you are looking for</p>
          <Link to="/">Back Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <div>
      <h3>Something went wrong</h3>
      <Link to="/">Back Home</Link>
    </div>
  );
};
export default Error;
