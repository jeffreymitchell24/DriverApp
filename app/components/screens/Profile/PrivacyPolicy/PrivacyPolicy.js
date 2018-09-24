import React from 'react'
import { PolicyView } from 'components/blocks'
import {PRIVACY_POLICY} from 'constants/policies'
const PrivacyPolicy = () => {
  return (
    <PolicyView
      text={PRIVACY_POLICY}
    />
  )
}

export default PrivacyPolicy
