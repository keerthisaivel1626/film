import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,

} from 'react-native';
import Colors from '../utils/colors';
import {bg} from '../utils/images';
import {GETAPI} from '../utils/NetWork';
import {SMALL_VERTICAL_SPACE, VERY_SMALL_VERTICAL_SPACE} from '../utils/data';
import CategoriesGridTile from '../components/CategoriesGridTile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import { storeFilmReducerData } from '../redux/reducers/FilmReducer';
const CardScreen = () => {
  const dispatch = useDispatch();
  const {filmReducerDetails} = useSelector(state => state.FilmReducer);

  const [filmData, setFilmData] = useState(filmReducerDetails);
  
  useLayoutEffect(() => {
    fetchFilmData();
  }, []);

  useEffect(() => {
    setFilmData(filmReducerDetails);
  
  }, [filmReducerDetails]);

  const fetchFilmData = async () => {
    const isFilmData = JSON.parse(await AsyncStorage.getItem('filmData'));
    if (isFilmData == null) {
      try {
        let requestFilmRes = await GETAPI('https://swapi.dev/api/films/');
        const {data, status} = requestFilmRes;
        await AsyncStorage.setItem('filmData', JSON.stringify(data.results));
        setFilmData(data.results);
        //dispatch(storeFilmReducerData(data.results));
      } catch (error) {
        console.log('fetchFilmData error', error);
      }
    } else {
      setFilmData(filmReducerDetails);
      dispatch(storeFilmReducerData(isFilmData));
    }
  };
   

  const renderFilmItem = itemData => {
     return (
       <CategoriesGridTile
         title={itemData.item['title']}
         data={itemData.item}
         color={'#eea'}
       />
     );
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.imageBg}>
        {filmData ? (
          <FlatList
            data={filmData}
            renderItem={renderFilmItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
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
export default CardScreen;
