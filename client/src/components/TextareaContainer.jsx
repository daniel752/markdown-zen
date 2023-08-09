import { useState } from 'react';
import MarkdownContainer from './MarkdownContainer';
import MarkdownEditor from '@uiw/react-markdown-editor';

const TextareaContainer = ({ defaultValue = '' }) => {
  const [isShowMarkdown, setIsShowMarkdown] = useState(true);
  const [mdContent, setMdContent] = useState(defaultValue);

  const handleClick = event => {
    event.preventDefault();
    setIsShowMarkdown(!isShowMarkdown);
  };

  const handleContentChange = event => {
    const { value } = event.target;
    setMdContent(value);
  };
  return (
    <div className="markdown-container">
      {/* <div className="textarea-titles"> */}
      <h5 className="editor-title">editor</h5>
      <MarkdownEditor
        value={mdContent}
        height="300px"
        onChange={value => {
          setMdContent(value);
        }}
      />
      <input type="hidden" name="content" value={mdContent} />
      {/* <div className="markdown-header">
          {isShowMarkdown && <h5 className="editor-title">markdown preview</h5>}
          <button
            className="show-markdown-btn btn btn-block form-btn"
            type="button"
            onClick={handleClick}
          >
            {isShowMarkdown ? 'hide' : 'show'}
          </button>
        </div> */}
      {/* </div> */}
      {/* <div className="grid-row"> */}
      {/* <textarea
          className="textarea-container"
          name="content"
          rows={7}
          onChange={handleContentChange}
          defaultValue={defaultValue}
        ></textarea> */}
      {/* <MarkdownContainer
        content={mdContent}
        handleClick={handleClick}
        isShowMarkdown={isShowMarkdown} */}
      {/* /> */}
      {/* </div> */}
    </div>
  );
};
export default TextareaContainer;
