# tahc
To use expo, familiarize yourself with the online help located at [the Expo Documentation Installation page](https://docs.expo.io/versions/latest/get-started/installation/).

The code you will use is `npm install -g expo-cli`

To use firebase, familiarize yourself with Google's Firebase service at [the Firebase Documentation page](https://firebase.google.com/docs/firestore/data-model).

You will need to
  1. **create an account**
  2. **log in**
  3. **instatiate a Database**
  4. **name your collection**
  5. **find and copy your user credentials**

Within your code, you will need to install and import the modules for...

`/App.js`
  *  React from 'react'
  *  { StyleSheet, Text, View } from 'react-native'
  *  { createAppContainer } from 'react-navigation'
  *  { createStackNavigator } from 'react-navigation-stack'
  *  KeyboardSpacer from 'react-native-keyboard-spacer'

`/components/Start.js`
  *  KeyboardSpacer from 'react-native-keyboard-spacer';
  *  React, { Component } from 'react';
  *  { StyleSheet, Text, TextInput, Alert, Button, View, ImageBackground, TouchableOpacity } from 'react-native';

`/components/Chat.js`
  * KeyboardSpacer from 'react-native-keyboard-spacer';
  * React, { Component } from "react";
  * { StyleSheet, View, Text, Platform, AsyncStorage } from "react-native";
  * { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
  * NetInfo from "@react-native-community/netinfo";
  * MapView from "react-native-maps";
  * CustomActions from './CustomActions';
`also include`
  * const firebase = require('firebase');
  * require('firebase/firestore');

`/components/CustomActions.js`
  * React, { Component } from "react";
  * PropTypes from "prop-types";
  * { StyleSheet, Text, View, TouchableOpacity } from "react-native";
  * firebase from "firebase";
  * "firebase/firestore";
  * `*` as Permissions from "expo-permissions";
  * `*` as ImagePicker from "expo-image-picker";
  * `*` as Location from "expo-location";
