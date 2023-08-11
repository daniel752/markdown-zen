/* eslint-disable react/no-unescaped-entities */
import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';

const Landing = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';

  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>
            <span>MarkdownZen: </span>Markdown Made Zenful
          </h1>
          <p>
            Welcome to MarkdownZen, the ultimate platform for creating,
            managing, and mastering your markdown content. Whether you're a
            seasoned writer or just beginning to explore the power of markdown,
            MarkdownZen offers you a tranquil haven to streamline your writing
            process. With intuitive tools and a serene interface, you can craft
            your markdown creations with ease, preview them in real time, and
            organize them effortlessly. Experience the harmony of MarkdownZen as
            it empowers you to focus on what truly matters, your content. Join
            us on a journey to elevate your markdown experience and achieve
            zen-like proficiency in managing your valuable written work.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <Logo src={isDarkTheme ? '/logo_white.png' : '/logo_black.png'} />
      </div>
    </Wrapper>
  );
};

export default Landing;
