'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Dimensions
} = React;

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

module.exports = StyleSheet.create({
  btnTextStyle: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  preloaderBlock: {
    width: width,
    height: height,
    backgroundColor: 'rgb(252,244,244)',
    alignItems: 'center',
    flexDirection: 'column',
  },
  preloaderBlock__forImage: {
    width: width * 0.8,
    height: height * 0.4,
    marginTop: width * 0.2,
    padding: width * 0.02,
  },
  preloaderBlock__img: {
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  preloaderBlock__account: {
    position: 'absolute',
    bottom: width * 0.05,
  },
  preloaderBlock__alreadyAcc: {
    color: '#000',
    marginRight: width * 0.02,
  },
  preloaderBlock__signIn: {
    color: 'rgb(222,71,71)',
  },
  preloaderForHeader: {
    width: width * 0.9,
    flexDirection: 'column',
    marginTop: width * 0.05,
  },
  preloaderHeader: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    width: width * 0.6,
    color: 'rgb(222,71,71)',
    marginBottom: width * 0.03
  },
  preloaderText: {
    width: width * 0.8,
  },
  preloaderBlock__Button: {
    backgroundColor: 'rgb(222,71,71)',
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.12,
    borderRadius: width * 0.1,
    shadowColor: 'rgb(222,71,71)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation:1,
    marginTop: width * 0.1,
  },
  headerLeftIcon: {
    fontFamily: 'FontAwesome'
    fontSize: width * 0.06,
    color: 'rgb(222,71,71)',
  }
});
