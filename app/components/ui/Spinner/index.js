import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal as RNModal,
  ActivityIndicator as RNSpinner,
  View
} from 'react-native'
import { colors } from 'theme'

const Spinner = ({ visible: isOpen }) => {
  if (!isOpen) return null
  console.log('Spinner', { isOpen })
  // const Wrapper = isOpen ? RNModal : View
  return (
    <RNModal visible={isOpen} transparent onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <RNSpinner color={colors.red} size="large" />
      </View>
    </RNModal>
  )
}

Spinner.propTypes = {
  visible: PropTypes.bool
}

export { Spinner }
