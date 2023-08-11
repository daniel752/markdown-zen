import { useState } from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

const TextareaContainer = ({ defaultValue = '' }) => {
  const [mdContent, setMdContent] = useState(defaultValue);

  return (
    <div className="markdown-container">
      <h5 className="editor-title">editor</h5>
      <MarkdownEditor
        value={mdContent}
        height="300px"
        onChange={value => {
          setMdContent(value);
        }}
      />
      <input type="hidden" name="content" value={mdContent} />
    </div>
  );
};
export default TextareaContainer;
