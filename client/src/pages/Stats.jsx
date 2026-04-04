import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const queryObject = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get('/jobs/stats');
    return response.data
  },
};

export const loader = (queryClient)=> async () => {
  const response = await queryClient.ensureQueryData(queryObject);
  return null
};

const Stats = () => {
  const {data} = useQuery(queryObject)
  const { defaultStats, monthlyApplications } = data;
  
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
