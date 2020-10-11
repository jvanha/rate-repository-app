import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 5,
    margin: 5,
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation failed')
    .required('Password confirmation is required')
});

const SignUpForm = ({ onSubmit }) => {
  
  return (
    <View>
      <FormikTextInput 
        name='username' 
        placeholder='username' 
        testID='username'
      />
      <FormikTextInput 
        name='password'
        placeholder='password'
        secureTextEntry={true}
        testID='password'
      />
      <FormikTextInput 
        name='passwordConfirmation'
        placeholder='password confirmation'
        secureTextEntry={true}
        testID='passwordConfirmation'
      />
      <View  style={styles.buttonStyle}>
        <Button title='Sign In' onPress={onSubmit} testID='submitButton'/>
      </View>
    </View>
    
  );
};

export const SignUpContainer = ({  onSubmit }) => {
  
  return (
    <Formik 
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}    
    </Formik>

  );
}; 
const SignUp = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  const [mutate] = useMutation(CREATE_USER);
  const onSubmit = async (values) => {
    console.log('signing up', values);
    const { username, password } = values;
    try {
      const data = await mutate({ variables: { username, password } });
      await signIn({ username, password });
      history.push('/');
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer history={history} signIn={signIn} onSubmit={onSubmit}/>;

};

export default SignUp;