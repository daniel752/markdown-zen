import { ChartsContainer, StatsContainer } from '../components';
import { useLoaderData } from 'react-router-dom';

const Stats = () => {
  const { defaultStats, monthlyPosts } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyPosts?.length > 0 && <ChartsContainer data={monthlyPosts} />}
    </>
  );
};
export default Stats;
