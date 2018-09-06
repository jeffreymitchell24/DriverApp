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
import Swiper from 'react-native-swiper';

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
      <Swiper
        style={{ flex: 1, borderWidth: 1, borderColor: '#000'}}
        paginationStyle={{ position: 'absolute', top: -560 }}
        dot={ <View style={{ backgroundColor: 'rgb(248, 226, 226)', width: height * 0.0156, height: height * 0.0156, borderRadius: 100, marginLeft: 3, marginRight: 3}} /> }
        activeDot={ <View style={{ backgroundColor: 'rgb(222,71,71)', width: height * 0.0156, height: height * 0.0156, borderRadius: 100, marginLeft: 3, marginRight: 3}} /> } >
                <View style={styles.slide}>
                  <CardSection style={styles.preloaderBlock}>
                    <CardSection style={styles.preloaderBlock__forImage}>
                      <Image source={require("../../files/images/preview1.png")} style={styles.preloaderBlock__img}></Image>
                    </CardSection>
                    <CardSection style={styles.preloaderForHeader}>
                      <Text style={styles.preloaderHeader}>Car Flow puts you in control.</Text>
                      <Text style={styles.preloaderText}>Think you're missing out the gig economy because you don't want to own or lease a car? Think again. All you need is Car Flow to start working for Uber, Lyft or any rideshare today.</Text>
                    </CardSection>
                    <CardSection style={styles.register__main}>
                      <View style={{ flex: 1 }}/>
                      <View style={ styles.register__BlockButton}>
                        <CardSection style={ styles.preloaderBlock__Button} >
                          <TouchableOpacity onPress={() => this._navigateTo('Register')}>
                            <Button>START</Button>
                          </TouchableOpacity>
                        </CardSection>
                      </View>
                      <CardSection style={styles.register__account}>
                        <Text style={styles.preloaderBlock__alreadyAcc}>Already have an account?</Text>
                        <Text style={styles.preloaderBlock__signIn}>Sign in</Text>
                      </CardSection>
                    </CardSection>
                  </CardSection>
                </View>
                <View style={styles.slide}>
                  <CardSection style={styles.preloaderBlock}>
                    <CardSection style={styles.preloaderBlock__forImage}>
                      <Image source={require("../../files/images/preview2.png")} style={styles.preloaderBlock__img}></Image>
                    </CardSection>
                    <CardSection style={styles.preloaderForHeader}>
                      <Text style={styles.preloaderHeader}>Reserve any car and start making money</Text>
                      <Text style={styles.preloaderText}>Car Flow is an innovative car sharing app for commercial drivers. You’ll need a valid driver’s license and a license from NYC’s Taxi and Limousine Commission (TLC).</Text>
                    </CardSection>
                    <CardSection style={styles.register__main}>
                      <View style={{ flex: 1 }}/>
                      <View style={ styles.register__BlockButton}>
                        <CardSection style={ styles.preloaderBlock__Button} >
                          <TouchableOpacity onPress={() => this._navigateTo('Register')}>
                            <Button>START</Button>
                          </TouchableOpacity>
                        </CardSection>
                      </View>
                      <CardSection style={styles.register__account}>
                        <Text style={styles.preloaderBlock__alreadyAcc}>Already have an account?</Text>
                        <Text style={styles.preloaderBlock__signIn}>Sign in</Text>
                      </CardSection>
                    </CardSection>
                  </CardSection>
                </View>
                <View style={styles.slide}>
                  <CardSection style={styles.preloaderBlock}>
                    <CardSection style={styles.preloaderBlock__forImage}>
                      <Image source={require("../../files/images/preview3.png")} style={styles.preloaderBlock__img}></Image>
                    </CardSection>
                    <CardSection style={styles.preloaderForHeader}>
                      <Text style={styles.preloaderHeader}>Don’t worry about car requirements</Text>
                      <Text style={styles.preloaderText}>With our fleet of new cars, you will not have to worry about the ridesharing company’s strict vehicle requirements anymore.</Text>
                    </CardSection>
                    <CardSection style={styles.register__main}>
                      <View style={{ flex: 1 }}/>
                      <View style={ styles.register__BlockButton}>
                        <CardSection style={ styles.preloaderBlock__Button} >
                          <TouchableOpacity onPress={() => this._navigateTo('Register')}>
                            <Button>START</Button>
                          </TouchableOpacity>
                        </CardSection>
                      </View>
                      <CardSection style={styles.register__account}>
                        <Text style={styles.preloaderBlock__alreadyAcc}>Already have an account?</Text>
                        <Text style={styles.preloaderBlock__signIn}>Sign in</Text>
                      </CardSection>
                    </CardSection>
                  </CardSection>
                </View>
                <View style={styles.slide}>
                  <CardSection style={styles.preloaderBlock}>
                    <CardSection style={styles.preloaderBlock__forImage}>
                      <Image source={require("../../files/images/preview4.png")} style={styles.preloaderBlock__img}></Image>
                    </CardSection>
                    <CardSection style={styles.preloaderForHeader}>
                      <Text style={styles.preloaderHeader}>Rideshare is the hottest gig in the country</Text>
                      <Text style={styles.preloaderText}>And New York City is the richest rideshare market. </Text>
                    </CardSection>
                    <CardSection style={styles.register__main}>
                      <View style={{ flex: 1 }}/>
                      <View style={ styles.register__BlockButton}>
                        <CardSection style={ styles.preloaderBlock__Button} >
                          <TouchableOpacity onPress={() => this._navigateTo('Register')}>
                            <Button>START</Button>
                          </TouchableOpacity>
                        </CardSection>
                      </View>
                      <CardSection style={styles.register__account}>
                        <Text style={styles.preloaderBlock__alreadyAcc}>Already have an account?</Text>
                        <Text style={styles.preloaderBlock__signIn}>Sign in</Text>
                      </CardSection>
                    </CardSection>
                  </CardSection>
                </View>
      </Swiper>
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
