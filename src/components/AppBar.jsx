import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

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
  const authStorage = useContext(AuthStorageContext);
  const client = useApolloClient();
  const { data, loading } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  const signOut = () => {
    authStorage.removeAccessToken();
    client.resetStore();
  };
  
  if (loading) return null;
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab text='Repositories' to='/'/>
        {data && data.authorizedUser
          ? <>
              <AppBarTab text='Create Review' to='review'/>
              <AppBarTab text='My Reviews' to='myreviews'/>
              <AppBarTab text='Sign out' to='/' onPress={signOut}/>
            </>
          : <>
              <AppBarTab text='Sign In' to='signin' />
              <AppBarTab text='Sign Up' to='signup' />
            </>
        }
      </ScrollView>
    </View>

  );
};

export default AppBar;
