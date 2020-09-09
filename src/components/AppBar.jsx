import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackround
    ,
    padding: 20,

    // ...
  },
  scrollView: {
    marginHorizontal: 16,
    flexGrow: 1,
    justifyContent: 'space-between'
  }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab text='Repositories' to='/'/>
        <AppBarTab text='Sign In' to='signin' />
      </ScrollView>
    </View>

  );
};

export default AppBar;