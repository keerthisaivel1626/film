import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { CardScreen, ListScreen, ViewScreen } from '../screens';

const RootStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      initialRouteName="Card">
      <Stack.Screen
        name="Card"
        component={CardScreen}
        options={{title: 'Films'}}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          title: 'LIST',
        }}
      />
      <Stack.Screen
        name="View"
        component={ViewScreen}
        options={{
          title: 'VIEW',
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
