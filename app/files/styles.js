'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Dimensions
} = React;

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

module.exports = StyleSheet.create({
  marginBottom16: {
    marginBottom: width * 0.04,
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  preloaderBlock: {
    flex: 1,
    backgroundColor: 'rgb(252,244,244)',
    alignItems: 'center',
    flexDirection: 'column',
  },
  preloaderBlock__forImage: {
    width: width,
    height: height * 0.45,
    marginTop: width * 0.1,
    padding: width * 0.02,
    paddingTop: 0,
  },
  preloaderBlock__img: {
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  preloaderBlock__account: {
    position: 'absolute',
    alignItems: "center",
    justifyContent: 'center',
    bottom: 0,
    width: width,
    marginBottom: width * 0.08,
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
    fontSize: width * 0.065,
    fontWeight: 'bold',
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
    marginTop: width * 0.08,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    padding: width * 0.04,
    backgroundColor: "#fff",
  },
  headerLeftIcon: {

    position: 'absolute',
    left: 10,
  },
  headerText: {
    fontSize: width * 0.045,
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  register: {
    backgroundColor: "#fff",
    flexDirection: 'column',
    flex: 1,
  },
  topNav: {
    height: 3.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dash: {
    height: 3.5,
    width: 30,
    backgroundColor: 'rgb(241,243,245)',
    marginLeft: 3,
    marginRight: 3,
  },
  dash__active: {
    backgroundColor: 'rgb(222,71,71)',
  },
  register__main: {
    padding: width * 0.04,
    paddingBottom: 0,
    flex: 1,
    flexDirection: 'column',
  },
  register__BlockButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * 0.04,
  },
  register__account: {
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: width * 0.04,
  },

});
