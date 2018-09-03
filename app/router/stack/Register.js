import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity, Platform,
  Dimensions
} from 'react-native';

import styles from '../../files/styles';

import { CardSection, Button } from '../../files/components';

import { StackActions, NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';


class Register extends Component {

	constructor(props) {
		super(props);

		this.state = {

		};
	}

	_navigateTo = (routeName) => {
		const resetAction = StackActions.reset({
		  index: 0,
		  actions: [NavigationActions.navigate({ routeName: routeName })],
		});
		this.props.navigation.dispatch(resetAction);
	}

	componentDidMount() {

	}

	render() {
		return (
			<CardSection style={styles.Register}>
        
      </CardSection>
		);
	}
}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

function mapStateToProps (state) {
	return {

	}
}

function mapDispatchToProps (dispatch) {
	return {

	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
