import React from 'react';
import { TouchableOpacity, View, StyleSheet} from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';
const styles = StyleSheet.create({
  container: {
    padding: 20,
  }
});
const AppBarTab = ({text, to, onPress}) => {
  return (
    <View style={styles.container}>
      <Link
      to={to}
      component={TouchableOpacity}
      activeOpacity={0.8}
      onPress={onPress}>
        <Text color='white'>{text}</Text> 
      </Link> 
    </View>
  );
};

export default AppBarTab;