/* eslint-disable react/prop-types */
import {
  BsFillChatLeftHeartFill,
  BsFillChatLeftTextFill,
  BsFillEyeFill,
  BsFillInfoSquareFill,
} from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Post';
import PostInfo from './PostInfo';
import { Form } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import MarkdownContainer from './MarkdownContainer';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';

day.extend(advancedFormat);

const Post = ({
  _id,
  title,
  categories,
  tags,
  content,
  likes,
  comments,
  views,
  status,
  createdAt,
}) => {
  const data = day(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{title.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
          <h6 className="category-text">{categories[0]}</h6>
          {`#${tags[0]}...`}
          <div className="markdown-small-container">
            <ReactMarkdown remarkPlugins={[gfm, remarkEmoji]}>
              {`${content.slice(0, 100)}...`}
            </ReactMarkdown>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PostInfo
            icon={<BsFillChatLeftTextFill />}
            text={
              comments.length > 3
                ? `${comments.slice(0, 3).join(', ')}...`
                : comments.join(', ')
            }
          />
          <PostInfo icon={<BsFillChatLeftHeartFill />} text={likes} />
          <PostInfo icon={<BsFillEyeFill />} text={views} />
          <div className={`status ${status.toLowerCase()}`}>
            {status.toLowerCase()}
          </div>
          <PostInfo icon={<FaCalendarAlt />} text={createdAt} />
        </div>
        <footer className="actions">
          <Link to={`../edit-post/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-post/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Post;
