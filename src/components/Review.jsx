import { Formik } from 'formik';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 5,
    margin: 5,
  }
});
const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('rating is required')
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput 
        name='ownerName' 
        placeholder='Repository owner name' 
        testID='ownerName'
      />
      <FormikTextInput 
        name='repositoryName'
        placeholder='Repository name'
        testID='RepositoryName'
      />
      <FormikTextInput 
        name='rating'
        placeholder='Rating between 0 and 100'
        testID='rating'
      />
      <FormikTextInput 
        name='review'
        placeholder='Review'
        testID='review'
      />
      <View  style={styles.buttonStyle}>
        <Button title='Create a review' onPress={onSubmit} testID='submitButton'/>
      </View>
    </View>
  );
};
const Review = () => {
  const history = useHistory();
  const [mutate] = useMutation(CREATE_REVIEW);
  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, review} = values;
    try {
      const { data } = await mutate({ variables: {
        repositoryName,
        ownerName,
        rating: Number(rating),
        text: review
      }});
      history.push(`/${data.createReview.repository.id}`);
      console.log(values);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik 
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        review: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default Review;