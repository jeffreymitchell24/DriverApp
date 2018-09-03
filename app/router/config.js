import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity, Platform,
  Dimensions
} from 'react-native';
import styles from '../files/styles';
import Preloader from './stack/Preloader';
import Register from './stack/Register';


export const Root = createStackNavigator({
	Preloader: {
		screen: Preloader,
		navigationOptions: {
			title: null,
			header: null,
		},
	},
	Register: {
		screen: Register,
		navigationOptions: {
			title: null,
			header: <View>
      <Icon
        name="arrow-left"
        size={20}
        color="rgb(222,71,71)"
      />

			</View>
		},
	},
},
{
	initialRouteName: 'Register',
	mode: 'modal',
	headerMode: 'screen',
});
