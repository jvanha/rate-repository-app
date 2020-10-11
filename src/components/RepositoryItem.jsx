import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import Text from './Text';
import RepositoryItemCounts from './RepositoryItemCounts';
import theme from '../theme';
import * as WebBrowser from 'expo-web-browser';

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
const RepositoryItem = ({ item, showLinkButton }) => {
  const handleOpen = () => {
    console.log(item.url);
    WebBrowser.openBrowserAsync(item.url);
    
  };
  return (
    <View testID='repositoryItem' style={{ backgroundColor: 'white' }}>
      <View style={styles.flexContainer}>
        <Image 
          style={styles.avatarImage}
          source={{
            uri: item.ownerAvatarUrl
          }}
        />
        <View style={styles.flexItem}>
          <Text fontSize='subheading' fontWeight='bold' testID='itemFullName'>{item.fullName}</Text>
          <Text color='textSecondary' testID='itemDescription'>{item.description}</Text>
          <View style={styles.pill}>
            <Text color='white' testID='itemLanguage'>{item.language}</Text>
          </View>
        </View>
      </View>
      <RepositoryItemCounts item={item} />
      {showLinkButton && <Button title='Open in GitHub' onPress={handleOpen} testID='submitButton'/>}
    </View>
  );
};

export default RepositoryItem;