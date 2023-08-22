import styled from 'styled-components';

const Wrapper = styled.section`
  width: 50%;
  background: var(--background-secondary-color);

  .collabs-table {
    display: grid;
    grid-template-rows: auto 1fr;
    max-width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--border-radius);
    background: var(--background-color);
    border: 1px solid var(--grey-300);
    color: var(--text-color);
  }
  .collabs-titles {
    display: grid;
    grid-template-columns: 1fr 1fr 0.3fr;
    border-bottom: 1px solid var(--grey-500);
    h6 {
      font-size: var(--small-text);
      padding: 0.5rem 0;
      text-transform: capitalize;
    }
  }
  .row {
    place-items: center start;
    display: grid;
    grid-template-columns: 1fr 1fr 0.2fr;
    padding: 0.5rem;
    -webkit-box-align: center;
    border-bottom: 1px solid var(--grey-300);
  }
`;

export default Wrapper;
