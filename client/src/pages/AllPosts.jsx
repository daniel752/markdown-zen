import { SearchContainer, PostsContainer } from '../components';
import { createContext, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

const AllPostsContext = createContext();

const AllPosts = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllPostsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <PostsContainer />
    </AllPostsContext.Provider>
  );
};

export const useAllPostsContext = () => useContext(AllPostsContext);

export default AllPosts;
