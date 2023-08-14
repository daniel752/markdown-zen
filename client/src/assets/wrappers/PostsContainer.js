import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 2rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    padding: 0 0 1rem 1rem;
  }
  .posts {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .posts {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
export default Wrapper;
