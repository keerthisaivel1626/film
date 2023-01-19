import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PlanetInfo  = ({planet}) => {
  
  return (
    <View style={styles.gridItem}>
      <Text>Name:{planet['name']}</Text>
      <Text>Gender:{planet['climate']}</Text>
      <Text>Hair Color:{planet['population']}</Text>
      <Text>Height:{planet['gravity']}</Text>
      <Text>Mass:{planet['terrain']}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  gridItem: {
    width: 300,
    margin: 16,
    height: 150,
    borderRadius: 8,
    padding: 20,

    backgroundColor: 'white',
  },
});
export default PlanetInfo;
