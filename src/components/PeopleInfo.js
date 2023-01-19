import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const PeopleInfo = ({person}) => {
 
  return (
    <View style={styles.gridItem}>
      {person && (
        <>
          <Text>Name:{person['name']}</Text>
          <Text>Gender:{person['gender']}</Text>
          <Text>Hair Color:{person['hair_color']}</Text>
          <Text>Height:{person['height']}</Text>
          <Text>Mass:{person['mass']}</Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  gridItem: {
    width: 150,
    margin: 16,
    height: 150,
    borderRadius: 8,
    padding: 20,
    backgroundColor: 'white',
  },
});
export default PeopleInfo
