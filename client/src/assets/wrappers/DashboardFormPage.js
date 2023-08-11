import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 2rem 2rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
    max-width: 35rem;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
  }
  .form-btn {
    display: grid;
    place-items: center;
    margin: 2rem auto;
    width: 30rem;
  }
  .profile-btn {
    margin: 2rem 0;
  }
  .avatar {
    width: 25%;
    height: auto;
    margin: 0 auto;
  }
  .multi-select {
    max-width: 100%;
    span {
      color: var(--text-color);
    }
  }
  .markdown-container {
    margin: 2rem 0;
    h5 {
      margin-bottom: 1rem;
    }
  }
  .dropdown-heading-value {
    overflow: unset;
  }
  .rmsc {
    color: var(--text-color);
    --rmsc-main: var(--background-color);
    --rmsc-hover: var(--background-secondary-color);
    --rmsc-selected: var(--background-secondary-color);
    --rmsc-border: #ccc;
    --rmsc-gray: #aaa;
    --rmsc-bg: var(--background-color);
    --rmsc-p: 10px;
    --rmsc-radius: 4px;
    --rmsc-h: 38px;
  }
  .wmde-markdown-var {
  }
  .md-editor-toolbar button {
    cursor: pointer;
    color: var(--text-color);
  }
  .md-editor-toolbar-warp:not(.md-editor-toolbar-bottom) {
    border-bottom: 1px solid hsl(0, 0%, 76.9%);
    color: var(--text-color);
    background-color: var(--background-color);
  }
  .cm-scroller {
    height: 100% !important;
    background: var(--background-color);
    color: var(--text-color);
  }
  .cm-gutters {
    background-color: var(--background-color);
    color: var(--text-color);
    border-right-color: var(--color-border-muted);
  }
  .ͼ1l {
    color: #0071ff;
    font-weight: bold;
  }
  .cm-editor {
    height: 100vh;
  }
  @media (min-width: 992px) {
    width: 100%;

    .profile-form {
      display: grid;
      grid-template-columns: 0.5fr 1fr;
    }
  }
`;

export default Wrapper;
