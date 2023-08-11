import styled from 'styled-components';

const Wrapper = styled.section`
  .logo {
    max-height: auto;
    max-width: 100%;
    grid-column: 1/2;
    grid-row: 1/2;
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
    grid-template-rows: auto;
    align-items: center;
    margin-top: 2rem;
    margin: 0 auto;
  }
  h1 {
    font-weight: 1000;
    font-size: 28px;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  span {
    color: var(--primary-500);
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
    grid-column: 1/2;
    grid-row: 2/3;
  }
  @media (min-width: 1100px) {
    .page {
      grid-template-columns: 1fr 1fr;
    }
    .logo {
      grid-column: 2/3;
      grid-row: 1/2;
    }
    .info {
      grid-column: 1/2;
      grid-row: 1/2;
    }
  }
`;
export default Wrapper;
