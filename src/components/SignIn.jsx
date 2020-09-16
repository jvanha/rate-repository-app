import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSignIn } from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

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
    .required('Password is required')
});
const SignInForm = ({ onSubmit }) => {
  
  return (
    <View>
      <FormikTextInput 
        name='username' 
        placeholder='username' 
      />
      <FormikTextInput 
        name='password'
        placeholder='password'
        secureTextEntry={true}
      />
      <View  style={styles.buttonStyle}>
        <Button title='Sign In' onPress={onSubmit} />
      </View>
    </View>
    
  );
};
const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      history.push('/');
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik 
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}    
    </Formik>

  );
};

export default SignIn;