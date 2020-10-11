import React from 'react';
import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import { FlatList, StyleSheet, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  flexItem: {
    marginHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: theme.colors.primary,
    borderWidth: 3,
    borderRadius: 22,
    width: 44,
    height: 44,
    padding: 6,
    margin: 4,
  },
  separator: {
    height: 10,
  },
});
export const ReviewItem = ({ review }) => {
  if (!review) return null;
  const content = review.node;
  console.log(content.createdAt);
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItem}>
        <View style={styles.circle}>
          <Text fontSize='subheading' fontWeight='bold' color='primary' >{content.rating}</Text>
        </View>
      </View>
      <View style={styles.flexItem}>
        <Text fontSize='subheading' fontWeight='bold'>{content.user.username}</Text>
        <Text>{format(new Date(content.createdAt), "dd.MM.yyyy")}</Text>
        <Text>{content.text}</Text>
      </View>
    </View>
  );
};

const RepositoryView = () => {
  const { id } = useParams();
  console.log('id', id);
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 3 },
    fetchPolicy: 'cache-and-network',
  });
  const handleFetchMore = () => {
    console.log(data);
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;
    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        id,
        first: 3,
        after: data.repository.reviews.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
          
            },
          },
        };
  
        return nextResult;
      }
    });
  };
  if (loading) return null;
  
  return (
    <>
    <FlatList
      data={data.repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item}/>}
      ListHeaderComponent={() => <RepositoryItem item={data.repository} showLinkButton={true}/>}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.node.id}
    />
    <Button onPress={handleFetchMore}>lisää</Button>
    </>
  );
};

export default RepositoryView;
