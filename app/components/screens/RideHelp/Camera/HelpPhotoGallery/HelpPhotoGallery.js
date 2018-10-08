import React from 'react'
import PropTypes from 'prop-types'
import {HelpPhotoPreview} from 'navigation/routeNames'
import { GalleryView } from 'components/blocks'

const HelpPhotoGallery = ({navigation}) => {
  const onSelectImage = ({photoUri}) => {
    navigation.navigate(HelpPhotoPreview, {
      photoUri
    })
  }
  return (
    <GalleryView
      onSelectImage={onSelectImage}
    />
  )
}

HelpPhotoGallery.propTypes = {
  navigation: PropTypes.object
}

export default HelpPhotoGallery
