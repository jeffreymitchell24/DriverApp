import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TextInput,
  Text,
	Dimensions,
	StyleSheet,
} from 'react-native';

export class TextInputView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: '',
			color1: '#dadada',
			color2: '#dadada'
		};
	}

	static propTypes = {
		placeholder: PropTypes.string.isRequired,
		styleContainer: PropTypes.object.isRequired,
		secureTextEntry: PropTypes.bool,
	}

	componentDidMount() {

	}

	render() {
		return (
      <View style={styles.InputWrapp}>
        <Text style={styles.InputLabel}>{this.props.text}</Text>
				<TextInput
					style={styles.InputInput}
					onChangeText={(value) => this.setState({value})}
					onBlur={ () => this.setState({
						color1: '#dadada',
						color2: '#dadada'
					}) }
					onFocus={ () => this.setState({
						color1: '#239570',
						color2: '#72bb5f'
					}) }
					value={this.state.value}
					placeholder={this.props.placeholder}
					placeholderTextColor='#5c5c5c'
					underlineColorAndroid='transparent'
					secureTextEntry={this.props.secureTextEntry || false}
				/>
      </View>

		);
	}
}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

var styles = StyleSheet.create({
	InputWrapp: {
    borderBottomWidth: 2,
		marginBottom: width * 0.04,
    borderBottomColor: 'rgb(241, 243, 245)',
  },
  InputLabel: {
		fontSize: width * 0.035,
		color: 'rgb(134, 142, 150)',
  },
  InputInput: {
		color: '#000',
		fontSize: width * 0.05,
  },
});
