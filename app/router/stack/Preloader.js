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


class Preloader extends Component {

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
			<CardSection style={styles.preloaderBlock}>
        <CardSection style={styles.preloaderBlock__forImage}>
          <Image source={require("../../files/images/1.jpg")} style={styles.preloaderBlock__img}></Image>
        </CardSection>
        <CardSection style={styles.preloaderForHeader}>
          <Text style={styles.preloaderHeader}>Car Flow puts you in control.</Text>
          <Text style={styles.preloaderText}>Think you're missing out the gig economy because you don't want to own or lease a car? Think again. All you need is Car Flow to start working for Uber, Lyft or any rideshare today.</Text>
        </CardSection>
        <CardSection style={styles.preloaderBlock__Button} >
          <TouchableOpacity onPress={() => this._navigateTo('Register')}>
            <Button>START</Button>
          </TouchableOpacity>
        </CardSection>
        <CardSection style={styles.preloaderBlock__account}>
          <Text style={styles.preloaderBlock__alreadyAcc}>Already have an account?</Text>
          <Text style={styles.preloaderBlock__signIn}>Sign in</Text>
        </CardSection>
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
)(Preloader);
