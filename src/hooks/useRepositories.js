import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  //console.log(variables);
  const [repositories, setRepositories] = useState();
  //const [loading, setLoading] = useState(false);
  const { data, loading, refetch, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
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
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      }
    });
  };
  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
         
     }
  }, [data]);

  return {
    repositories,
    loading,
    refetch,
    fetchMore: handleFetchMore,
    ...result
  };
};

export default useRepositories;