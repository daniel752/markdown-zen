/* eslint-disable react/no-unescaped-entities */
import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      {/* <nav>
        <Logo></Logo>
      </nav> */}
      <div className="container page">
        <div className="info">
          <h1>
            <span>MarkdownZen: </span>Markdown Made Zenful
          </h1>
          <p>
            Welcome to My Spot - Where Thoughts Shine! Unleash your creativity
            and connect with others through meaningful blogging. Join today and
            claim your spot in our vibrant community of passionate thinkers!
            Let's make your ideas shine together.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <Logo />
        {/* <img src={main} alt="blog" className="img main-img" /> */}
      </div>
    </Wrapper>
  );
};

export default Landing;
