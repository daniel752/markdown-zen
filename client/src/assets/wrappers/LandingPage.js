import styled from 'styled-components';

const Wrapper = styled.section`
  .logo {
    /* padding-top: 12px; */
    /* height: var(--nav-height); */
    max-height: 100%;
    max-width: 100%;
  }
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 2rem 3rem;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    grid-template-rows: 1fr 500px;
    align-items: start;
    margin-top: 2rem;
  }
  h1 {
    font-weight: 1000;
    font-size: 28px;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  span {
    color: var(--primary-500);
    /* padding-left: 0.5rem; */
    /* padding-left: calc(100vw - 75%); */
    font-weight: 1000;
    font-size: 28px;
  }
  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
  }
  .info {
    width: max-content;
    margin: 4rem 1rem;
  }
  @media (min-width: 1100px) {
    .page {
      grid-template-columns: 1fr 500px;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
