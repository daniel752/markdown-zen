import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 100%;
    /* margin: 0 auto; */
    padding: 2rem 0 0 0;
    margin-left: 2.25rem;
    width: 97%;
    max-width: 97%;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
  }
`;
export default Wrapper;
