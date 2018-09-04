import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { StackActions, NavigationActions } from 'react-navigation';

import styles from '../../files/styles';


const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

export class Header extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerLeftIcon} >
          <Icon style={{fontSize: width * 0.05,
          color: 'rgb(222,71,71)',}} name="arrow-left" size={16} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{this.props.text}</Text>
      </View>
    );
  }
}
