import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import { AndroidBackHandler } from 'react-navigation-backhandler'
import { Home } from 'navigation/routeNames'
import PropTypes from 'prop-types'
import { backgrounds } from 'images'
import { Button } from 'components/ui'
import { colors, metrics } from 'theme'

const BookingConfirmed = ({ navigation }) => {
  const onBackButtonPressAndroid = () => true
  const onPress = () => {
    navigation.navigate(Home)
  }

  let {
    car = '',
    startDate = '',
    endDate = '',
    isRecurring = false
  } = navigation.getParam('bookingData', {})

  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.flexGrow1}
        style={styles.flex1}
      >
        <View style={styles.container}>
          <View style={styles.flex1}>
            <Text style={styles.title}>
              {isRecurring ? 'Recurring booking created!' : 'Booking created!'}
            </Text>

            <View style={styles.imageContainer}>
              <Image
                resizeMode={'contain'}
                source={backgrounds['highFive']}
                style={styles.image}
              />
            </View>

            <Text style={styles.mainText}>
              {isRecurring
                ? `You have successfully created a recurring booking on every ${startDate.format(
                    'dddd [from] hh:mmA'
                  )} to ${endDate.format('dddd hh:mmA')} on ${car}.`
                : `You have successfully created a booking on ${startDate.format(
                    'dddd DD MMM [from] hh:mmA'
                  )} to ${endDate.format('dddd DD MMM hh:mmA')} on ${car}.`}
            </Text>
          </View>

          <Button
            containerStyle={styles.button}
            inverted
            textStyle={styles.buttonText}
            title={'CONTINUE'}
            onPress={onPress}
          />
        </View>
      </ScrollView>
    </AndroidBackHandler>
  )
}

BookingConfirmed.propTypes = {
  navigation: PropTypes.object
}

export default BookingConfirmed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.contentMarginSmall,
    paddingBottom: 32,
    paddingTop: 45,
    justifyContent: 'space-between'
  },

  flex1: {
    flex: 1
  },
  flexGrow1: {
    flexGrow: 1
  },

  title: {
    color: colors.gray300,
    fontFamily: 'SFProText-Regular',
    fontSize: 28,
    textAlign: 'center'
  },
  imageContainer: {
    flex: 1,
    marginTop: 40,
    marginBottom: 40
  },

  image: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainText: {
    color: colors.gray300,
    fontFamily: 'SFProText-Regular',
    fontSize: metrics.fontSizeBig,
    marginBottom: metrics.contentMargin
  },
  subText: {
    fontFamily: 'SFProText-Regular',
    fontSize: metrics.fontSizeBig,
    color: colors.gray200
  },

  button: {
    backgroundColor: colors.white,
    borderColor: '#E9ECEF',
    borderWidth: 1
  },

  buttonText: {
    color: colors.red
  }
})
