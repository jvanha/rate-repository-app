import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

const { useMutation, useApolloClient } = require("@apollo/react-hooks");
const { AUTHORIZE } = require("../graphql/mutations");

export const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async (username, password) => {
    console.log('Signing in...');
    const { data } = await mutate({ variables: username, password });
    await authStorage.setAccessToken(data.authorize.accessToken);
    console.log('signed in');
    client.resetStore();
    return data;
  };
  return [signIn, result];
};