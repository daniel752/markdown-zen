import { FaCheck, FaArchive, FaSeedling } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: 'draft posts',
      count: defaultStats?.draft || 0,
      icon: <FaSeedling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'published posts',
      count: defaultStats?.ready || 0,
      icon: <FaCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'archived posts',
      count: defaultStats?.archive || 0,
      icon: <FaArchive />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {stats.map(item => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
