
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import IdentifyTutorial from '../screen/identify-tutorial';
const Stack: any = createStackNavigator<any>();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        "IdentifyTutorial"
      }>
      <Stack.Screen name="IdentifyTutorial" component={IdentifyTutorial} options={{ title: 'IdentifyTutorial' }} />
    </Stack.Navigator>
  )
}