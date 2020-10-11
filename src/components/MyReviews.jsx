import { useMutation, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Alert, Button, FlatList, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { AUTHORIZED_USER } from '../graphql/queries';
import { ReviewItem } from './RepositoryView';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 5
  },
  separator: {
    height: 10,
  },

});


const ReviewContainer = ({ item, refetch }) => {
  const history = useHistory();
  
  const [mutate] = useMutation(DELETE_REVIEW);
  const onDelete = async (id) => {
    try {
      const { data } = await mutate({ variables: {
        id
      }});
      if (data.deleteReview)
        refetch();
    } catch (e) {
      console.log(e);
    }
  };
  const showAlert = (id) =>
    Alert.alert(
      "Delete review",
      "Are you sure that you want to delete this review",
    [
      {
        text: "Cancel",
        onPress: () => console.log("cancelled"),
        style: "cancel"
      },
      { text: "OK", onPress: onDelete(id) }
    ],
    { cancelable: false }
  );
  return (
    <View>
      <ReviewItem review={item}/>
      <View style={styles.flexContainer}>
        <Button
        onPress={() => history.push(`/${item.node.repositoryId}`)}
        title='View Repository'
        />
        <Button
        onPress={() => showAlert(item.node.id)}
        title='Delete Review'
        color='red'
        />
      </View>
    </View>
  );
};
const MyReviews = () => {
  const { data, loading, refetch } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });
  if (loading) return null;
  return (
    <FlatList
      data={data.authorizedUser.reviews.edges}
      renderItem={({ item }) => <ReviewContainer item={item} refetch={refetch} />}
      ListHeaderComponent={() => null}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => item.node.id}
    />
  );
};

export default MyReviews;