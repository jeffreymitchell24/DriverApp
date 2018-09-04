import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity, Platform,
  Dimensions,
} from 'react-native';

import styles from '../../files/styles';

import { CardSection, Button, TextInputView } from '../../files/components';

import { StackActions, NavigationActions } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';


class PersonalInfo extends Component {

	constructor(props) {
		super(props);

		this.state = {
      email: '',
      password: '',
      confirmPassword: '',
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
    let { email, password, confirmPassword } = this.state;
		return (
			<CardSection style={styles.register}>
        <CardSection style={styles.topNav}>
          <View style={[styles.dash, styles.dash__active]}></View>
          <View style={[styles.dash, styles.dash__active]}></View>
          <View style={styles.dash}></View>
        </CardSection>

        <CardSection style={styles.register__main}>
          <ScrollView  showsVerticalScrollIndicator={false} >
            <TextInputView
                ref='fullname'
                text="FULL NAME"
                placeholder=''
            />
            <TextInputView
                ref='street'
                text="STREET"
                placeholder=''
            />
            <TextInputView
                ref='city'
                text="CITY"
                placeholder=''
            />
            <TextInputView
                ref='zipcode'
                text="ZIP CODE"
                placeholder=''
            />
            <TextInputView
                ref='state'
                text="STATE"
                placeholder=''
            />
            <TextInputView
                ref='phone'
                text="PHONE NUMBER"
                placeholder=''
            />
          </ScrollView>
          <View style={ styles.register__BlockButton}>
            <CardSection style={ styles.preloaderBlock__Button} >
              <TouchableOpacity>
                <Button>UPLOAD DOCUMENTS</Button>
              </TouchableOpacity>
            </CardSection>
          </View>
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
)(PersonalInfo);
