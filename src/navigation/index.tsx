
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import InvestTutorial from '../screen/invest-tutorial';
const Stack: any = createStackNavigator<any>();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        "InvestTutorial"
      }>
      <Stack.Screen name="InvestTutorial" component={InvestTutorial} options={{ title: 'InvestTutorial' }} />
    </Stack.Navigator>
  )
}