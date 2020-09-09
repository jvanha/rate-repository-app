import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import RepositoryItemCounts from './RepositoryItemCounts';
import theme from '../theme';
const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexItem: {
    marginHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  avatarImage: {
    width: 50,
    height: 50,
    margin: 10,
   //  marginHorizontal: 10,
  },
  pill: {
    backgroundColor: theme.colors.languageTag,
    borderRadius: 10,
    padding: 6,
    margin: 4,
  }
});
const RepositoryItem = ({ item }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.flexContainer}>
        <Image 
          style={styles.avatarImage}
          source={{
            uri: item.ownerAvatarUrl
          }}
        />
        <View style={styles.flexItem}>
          <Text fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
          <Text color='textSecondary'>{item.description}</Text>
          <View style={styles.pill}>
            <Text color='white'>{item.language}</Text>
          </View>
        </View>
      </View>
      <RepositoryItemCounts item={item} />
    </View>
  );
};

export default RepositoryItem;