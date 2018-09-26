import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

let BookingDetail = ({label, text}) => (
  <View style={styles.bookingDetail}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailText}>{text}</Text>
  </View>
)

BookingDetail.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string
}

let CarImage = () => {
  return <View style={styles.carPhoto} />
}

let SectionTitle = ({title}) => {
  return <Text style={styles.sectionTitle}>{title}</Text>
}

SectionTitle.propTypes = {
  title: PropTypes.string
}

export {BookingDetail, CarImage, SectionTitle}
