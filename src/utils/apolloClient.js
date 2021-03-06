import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = (authStorege) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorege.getAccessToken();
        operation.setContext({
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    uri: Constants.manifest.extra.apolloUri
  });
};

export default createApolloClient;