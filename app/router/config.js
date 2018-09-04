import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../files/styles';

import  {Header}  from '../files/components';

import Preloader from './stack/Preloader';
import Register from './stack/Register';
import PersonalInfo from './stack/PersonalInfo';

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
			header: <Header text='Account' />
		},
	},
  PersonalInfo: {
		screen: PersonalInfo,
		navigationOptions: {
			title: null,
			header: <Header text='Personal information' />
		},
	},
},
{
	initialRouteName: 'Preloader',
	mode: 'modal',
	headerMode: 'screen',
});
