import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});


const RepositoryItemCounts = ({ item }) => {
  const parseCount = (count) => {
    if (count<1000) return count;
    return Number.parseFloat(count/1000).toFixed(1).toString() + 'k';
  };
  return (
    <View style={styles.flexContainer}>
      <View>
        <Text fontWeight='bold' testID='stargazerCount'>{parseCount(item.stargazersCount)}</Text>
        <Text color='textSecondary'>Stars</Text>
      </View>
      <View>
        <Text fontWeight='bold' testID='forksCount'>{parseCount(item.forksCount)}</Text>
        <Text color='textSecondary'>Forks</Text>
      </View>
      <View>
        <Text fontWeight='bold' testID='reviewCount'>{parseCount(item.reviewCount)}</Text>
        <Text color='textSecondary'>Reviews</Text>
      </View>
      <View>
        <Text fontWeight='bold' testID='ratingAverage'>{parseCount(item.ratingAverage)}</Text>
        <Text color='textSecondary'>Ratings</Text>
      </View>
    </View>
  );
};/*
<Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>*/
export default RepositoryItemCounts;