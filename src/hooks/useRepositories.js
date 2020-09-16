import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  
  const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  /*const fetchRepositories = async () => {
    setLoading(true);
    const response = await fetch('http://127.0.0.1:5000/api/repositories');
    const json = await response.json();
    setLoading(false);
    setRepositories(json);
  };*/
  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
    }
  }, [data]);

  return { repositories, loading, refetch };
};

export default useRepositories;