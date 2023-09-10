import { ChartsContainer, StatsContainer } from '../components';
import { useQuery } from '@tanstack/react-query';
import { statsQuery } from '../utils/loadersUtils';

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyPosts } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyPosts?.length > 0 && <ChartsContainer data={monthlyPosts} />}
    </>
  );
};
export default Stats;
