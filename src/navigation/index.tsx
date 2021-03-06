
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import InvestTutorial from '../screen/invest-tutorial';

import IdentifyTutorial from '../screen/identify-tutorial';
import IdentifyBack from '../screen/identify-back';
import IdentifyBackResult from '../screen/identify-back-result';
import IdentifyFront from '../screen/identify-front';
import IdentifyFrontResult from '../screen/identify-front-result';
import IdentifyConfirm from '../screen/identify-confirm';

import VideoTutorial from '../screen/video-tutorial';
import Video from '../screen/video';
import VideoResult from '../screen/video-result';
import InfoConfirm from '../screen/info-confirm';

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
      <Stack.Screen name="IdentifyFront" component={IdentifyFront} options={{ title: 'IdentifyFront' }} />
      <Stack.Screen name="IdentifyFrontResult" component={IdentifyFrontResult} options={{ title: 'IdentifyFrontResult' }} />
      <Stack.Screen name="IdentifyTutorial" component={IdentifyTutorial} options={{ title: 'IdentifyTutorial' }} />
      <Stack.Screen name="IdentifyBack" component={IdentifyBack} options={{ title: 'IdentifyBack' }} />
      <Stack.Screen name="IdentifyBackResult" component={IdentifyBackResult} options={{ title: 'IdentifyBackResult' }} />
      <Stack.Screen name="IdentifyConfirm" component={IdentifyConfirm} options={{ title: 'IdentifyConfirm' }} />
      <Stack.Screen name="VideoTutorial" component={VideoTutorial} options={{ title: 'VideoTutorial' }} />
      <Stack.Screen name="Video" component={Video} options={{ title: 'Video' }} />
      <Stack.Screen name="VideoResult" component={VideoResult} options={{ title: 'VideoResult' }} />
      <Stack.Screen name="InfoConfirm" component={InfoConfirm} options={{ title: 'InfoConfirm' }} />
    </Stack.Navigator>
  )
}