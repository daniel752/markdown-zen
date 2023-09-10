import { useAllPostsContext } from '../pages/AllPosts';
import Post from './Post';
import Wrapper from '../assets/wrappers/PostsContainer';
import PageBtnContainer from './PageBtnContainer';
import { useOutletContext } from 'react-router-dom';

const PostsContainer = () => {
  const { user } = useOutletContext();
  const { data } = useAllPostsContext();
  const { posts, totalPosts, numPages } = data;

  const isOwner = (userId, author) => {
    return userId === author;
  };
  // const isEditCollaborator = collaborator => {
  //   if (collaborator) return collaborator.hasEditPermission;
  //   return false;
  // };

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
        {/* {posts.map((post, index) =>
          isOwner(user._id, post.author) ||
          isEditCollaborator(collaborators[index]) ? (
            <Post key={post._id} {...post} isEditable={true} />
          ) : (
            <Post key={post._id} {...post} />
          ),
        )} */}
        {posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </div>
      {numPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default PostsContainer;
