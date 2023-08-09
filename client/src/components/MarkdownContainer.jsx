import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import MarkdownEditor from '@uiw/react-markdown-editor';

const MarkdownContainer = ({
  content = '',
  handleClick = '',
  isShowMarkdown = true,
}) => {
  if (isShowMarkdown) {
    return (
      <div className="markdown-container">
        <div
          className={
            isShowMarkdown ? 'markdown-render' : 'markdown-render hide'
          }
        >
          <MarkdownEditor value={content} />
          {/* <ReactMarkdown remarkPlugins={[gfm, remarkEmoji]}>
            {content}
          </ReactMarkdown> */}
        </div>
      </div>
    );
  } else {
    return (
      <button className="show-markdown-btn" type="button" onClick={handleClick}>
        {isShowMarkdown ? 'Hide' : 'Show'}
      </button>
    );
  }
};

export default MarkdownContainer;
