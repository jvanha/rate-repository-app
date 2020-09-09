import React from 'react';
import { TextInput as NativeTextImput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    borderColor: '#586069',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'white'
  },
});

// eslint-disable-next-line no-unused-vars
const TextInput= ({ style, error, ...props}) => {
  const textInputStyle = [
    styles.textInput,
    style,
  ];
  return <NativeTextImput style={textInputStyle} {...props} />;
};

export default TextInput;