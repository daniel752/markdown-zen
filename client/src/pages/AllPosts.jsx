import { useQuery } from '@tanstack/react-query';
import { SearchContainer, PostsContainer } from '../components';
import { createContext, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { allPostsQuery } from '../utils/loadersUtils';

const AllPostsContext = createContext();

const AllPosts = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allPostsQuery(searchValues));

  return (
    <AllPostsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <PostsContainer />
    </AllPostsContext.Provider>
  );
};

export const useAllPostsContext = () => useContext(AllPostsContext);

export default AllPosts;
