/* eslint-disable react/prop-types */
import {
  BsFillChatLeftHeartFill,
  BsFillChatLeftTextFill,
  BsFillEyeFill,
} from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Post';
import PostInfo from './PostInfo';
import { Form } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

day.extend(advancedFormat);

const Post = ({
  _id,
  title,
  categories,
  tags,
  content,
  status,
  createdAt,
  isEditable = true,
}) => {
  // const data = day(createdAt).format('MMM Do, YYYY');
  // const commentsLimit = 3;
  const tagsLimit = tags.length < 5 ? tags.length : 5;

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{title.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
          <h6 className="category-text">{categories[0]}</h6>
          {tags?.length > 0
            ? tags.map((tag, index) =>
                tag !== '' && index < tagsLimit ? (
                  <span key={tag}>
                    {index < tagsLimit - 1 ? `#${tag}, ` : `#${tag}`}
                  </span>
                ) : (
                  ''
                ),
              )
            : ''}
        </div>
      </header>
      <div className="content">
        <PostInfo icon={<FaCalendarAlt />} text={createdAt} />
        <footer className="actions">
          <>
            <Link to={`../view-post/${_id}`} className="btn post-info-btn">
              View
            </Link>
          </>
          {isEditable ? (
            <>
              <Link to={`../edit-post/${_id}`} className="btn post-info-btn">
                Edit
              </Link>
              <Form method="post" action={`../delete-post/${_id}`}>
                <button type="submit" className="btn post-info-btn">
                  Delete
                </button>
              </Form>
            </>
          ) : null}
          <Form method="post" action={`../download-post`}>
            <button type="submit" className="btn post-info-btn">
              Export
            </button>
            <input
              type="hidden"
              name="markdown"
              value={JSON.stringify({ title, content })}
            />
          </Form>
          <div className={`status ${status}`}>{status}</div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Post;
