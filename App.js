import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import KeyboardSpacer from 'react-native-keyboard-spacer';

/**
* @name navigator
* @type createStackNavigator
* @param object - object of screens to incorporate
*/
const navigator = createStackNavigator({
  Start: { screen: Start },
  Chat: { screen: Chat }
});

//Main Container
const navigatorContainer = createAppContainer(navigator);

/**
* The Screen Container
* @exports navigatorContainer
*/

export default navigatorContainer;
