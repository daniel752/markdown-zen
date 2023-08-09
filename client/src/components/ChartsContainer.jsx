import { useState } from 'react';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Posts</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        Show {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
