import { useAllPostsContext } from '../pages/AllPosts';
import Post from './Post';
import Wrapper from '../assets/wrappers/PostsContainer';
import PageBtnContainer from './PageBtnContainer';

const PostsContainer = () => {
  const { data } = useAllPostsContext();
  const { posts, totalPosts, numPages } = data;

  if (posts.length === 0) {
    return (
      <Wrapper>
        <h2>No posts to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalPosts} post{posts.length > 1 && 's'} found
      </h5>
      <div className="posts">
        {posts.map(post => {
          return <Post key={post._id} {...post} />;
        })}
      </div>
      {numPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default PostsContainer;
