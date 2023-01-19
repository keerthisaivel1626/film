import {useLayoutEffect, useEffect, useState, memo} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GETAPI} from '../utils/NetWork';
import PeopleInfo from './PeopleInfo';
import {useDispatch, useSelector} from 'react-redux';
import {
  storePeopleReducerData,
  storePlanetsReducerData,
} from '../redux/reducers/FilmReducer';
import PlanetInfo from './PlanetInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoriesGridTile = ({...props}) => {
  const {peopleReducerDetails, planetReducerDetails} = useSelector(
    state => state.FilmReducer,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [peoples, setPeoples] = useState(peopleReducerDetails);
  const [planets, setPlanets] = useState(planetReducerDetails);
  useEffect(() => {
    if (props?.powerFlag == 'extraData') {
      fetchPersonData();
    }
  }, []);
  useEffect(() => {
    setPeoples(peopleReducerDetails);
    setPlanets(planetReducerDetails);
  }, [peopleReducerDetails, planetReducerDetails]);

  const fetchPersonData = async () => {
    let people = [];
    let planet = [];
    const isPeopleData = JSON.parse(await AsyncStorage.getItem('peopleData'));
    const isPlanetData = JSON.parse(await AsyncStorage.getItem('planetData'));

    if (isPeopleData == null || isPlanetData == null) {
      try {
        props.data['characters'].map(async p => {
          requestPeopleRes = await GETAPI(p);
          const {data, status} = requestPeopleRes;
          if (status == 200) {
            people = [...people, data];
            if (people.length && people) {
              await AsyncStorage.setItem('peopleData', JSON.stringify(people));
              dispatch(storePeopleReducerData(people));
             setPeoples(people);
            }
          } else {
            console.log(' requestPeopleRes error');
          }
        });

        props.data['planets'].map(async p => {
          requestPlanetRes = await GETAPI(p);
          const {data, status} = requestPlanetRes;
          if (status == 200) {
            planet = [...planet, data];
           
            if (planet.length && planet) {
              await AsyncStorage.setItem('planetData', JSON.stringify(planet));
              dispatch(storePlanetsReducerData(planet));
              setPlanets(planet);
            }
          } else {
            console.log(' requestPlanetRes error');
          }
        });

        
      } catch (error) {
        console.log('fetchPersonData error', error);
      }
    } else {
      setPeoples(isPeopleData);
      setPlanets(isPlanetData);
    }
  };

   const renderPersonItem = itemData => {
   
     return <PeopleInfo person={itemData.item} />;
   };
    const renderPlanetItem = itemData => {
      return <PlanetInfo planet={itemData.item} />;
    };
  return (
    <View style={{...styles.gridItem, backgroundColor: props.color}}>
      <Pressable
        android_ripple={props?.powerFlag == 'extraData' ? '' : {color: '#ccc'}}
        style={({pressed}) => [
          styles.buttonContainer,
          pressed && props?.powerFlag !== 'extraData'
            ? styles.pressableButtonContainer
            : null,
        ]}
        onPress={() =>
          props.flag == 'subGrid'
            ? navigation.navigate('View', {categoryData: props.data})
            : navigation.navigate('List', {
                categoryTile: props.title,
                categoryData: props.data,
              })
        }>
        <View style={styles.innerGridItem}>
          {props?.flag !== 'subGrid' ? (
            <Text style={styles.title}>{props.title}</Text>
          ) : (
            props.powerFlag !== 'extraData' && (
              <View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    episode Id:
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 40,
                      fontSize: 14,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {props.data['episode_id']}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    Opening Crawl:
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: 'black'}}>
                    {props.data['opening_crawl']}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    Director:
                  </Text>

                  <Text
                    style={{
                      marginHorizontal: 50,
                      fontSize: 14,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {props.data['director']}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    Producer:
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 42,
                      fontSize: 14,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {props.data['producer']}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    Release Date:
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontSize: 14,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {props.data['release_date']}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    Characters:
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 30,
                      fontSize: 14,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {props.data['characters'].length}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    Planets:
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 60,
                      fontSize: 14,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {props.data['planets'].length}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    No of starships:
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: 'black'}}>
                    {props.data['starships'].length}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    No of vehicles:
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 15,
                      fontSize: 14,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {props.data['vehicles'].length}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={{fontSize: 14, fontWeight: '500', color: 'white'}}>
                    No of species:
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: 20,
                      fontSize: 14,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {props.data['species'].length}
                  </Text>
                </View>
              </View>
            )
          )}
          {((props.powerFlag == 'extraData' && peoples) ||
            (planets && props?.flag === 'subGrid')) && (
            <View>
              {peoples && (
                <>
                  <Text>Peoples</Text>
                  <FlatList
                    horizontal={true}
                    data={peoples}
                    renderItem={renderPersonItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              )}

              {planets && (
                <>
                  <Text>Planets</Text>
                  <FlatList
                    horizontal={true}
                    data={planets}
                    renderItem={renderPlanetItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default memo(CategoriesGridTile);
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 6,

    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  pressableButtonContainer: {
    opacity: 0.5,
  },
  innerGridItem: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
});
