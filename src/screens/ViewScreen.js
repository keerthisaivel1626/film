
import {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import Colors from '../utils/colors';
import {bg} from '../utils/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoriesGridTile from '../components/CategoriesGridTile';

const ViewScreen = ({route, navigation}) => {
   
    const filmData = route.params.categoryData;
    const [fData, setFData] = useState(filmData);
  // render
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.imageBg}>
        {fData ? (
          <CategoriesGridTile data={fData} color={'#567890'} flag="subGrid" powerFlag="extraData"/>
        ) : (
          <View style={styles.NoDataContainer}>
            <Text style={styles.NoDataText}>No Data!</Text>
            <Image
              source={{
                uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/capybara+copy.png',
              }}
              style={styles.NoDataImage}
              resizeMode="contain"
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
  },
  filmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filmDetails: {
    marginTop: 10,
    height: 250,
    width: '100%',
  },
  NoDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  NoDataText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'gray',
  },
  NoDataImage: {
    width: '80%',
    aspectRatio: 2 / 1,
  },

  subFilmContainer: {
    elevation: 8,
    backgroundColor: '#ebb3b2',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
    marginVertical: 8,
  },
  bottomView: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 25,
    zIndex: 1,
  },
});
export default ViewScreen
