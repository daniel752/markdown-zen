import { useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from '../components/StatItem';
import { FaBook, FaUsers } from 'react-icons/fa';

const Admin = () => {
  const { users, posts } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        count={users}
        icon={<FaUsers />}
        title="current users"
        color="#e9b949"
        bcg="#fcefc7"
      />
      <StatItem
        count={posts}
        icon={<FaBook />}
        title="current posts"
        color="#647acb"
        bcg="#e0e8f9"
      />
    </Wrapper>
  );
};
export default Admin;
