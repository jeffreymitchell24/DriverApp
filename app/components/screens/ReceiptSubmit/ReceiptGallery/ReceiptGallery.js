import React from 'react'
import PropTypes from 'prop-types'
import {ReceiptPreview} from 'navigation/routeNames'
import { GalleryView } from 'components/blocks'

const ReceiptGallery = ({navigation}) => {
  const onSelectImage = ({photoUri}) => {
    navigation.navigate(ReceiptPreview, {
      photoUri
    })
  }
  return (
    <GalleryView
      onSelectImage={onSelectImage}
    />
  )
}

ReceiptGallery.propTypes = {
  navigation: PropTypes.object
}

export default ReceiptGallery
